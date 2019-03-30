<template>
  <div class="wd-sticky">
    <div class="wd-sticky-placeholder" ref="stickPlaceholder">
      <div class="wd-sticky-wrapper" ref="stickyWrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WdSticky',
    props: {
      topSpace: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        stickPlaceholder: {},
        stickyWrapper: {},
        scrollTop: 0
      };
    },
    mounted () {
      this.cacheDOM();
      window.addEventListener('scroll', this.onScroll);
    },
    methods: {
      cacheDOM () {
        const { stickPlaceholder, stickyWrapper } = this.$refs;
        this.stickPlaceholder = stickPlaceholder;
        this.stickyWrapper = stickyWrapper;
        // 要注意一个问题，用户可能实在滚动后刷新页面，而刷新页面后的top值会重新变化，而top+window.scrollY是不变的，表示元素到浏览器文档顶部的距离
        this.scrollTop = stickyWrapper.getBoundingClientRect().top + window.scrollY;
      },
      setPosition () {
        const { stickPlaceholder, stickyWrapper } = this;
        const { left } = stickPlaceholder.getBoundingClientRect();
        stickyWrapper.style.position = 'fixed';
        stickyWrapper.style.width = stickPlaceholder.offsetWidth + 'px';
        stickyWrapper.style.left = left + 'px';
        stickyWrapper.style.top = this.topSpace + 'px';
        // 这里要考虑一个问题：如果sticky组件包裹的内容的高度是不确定的，如一个异步加载的图片
        // 这里并没有从根本上解决这个问题，只是说考虑到在用户滚动的时候，图片应该是加载出来的，其实从根本上来将还是可能会有小问题
        stickPlaceholder.style.height = stickyWrapper.offsetHeight + 'px';
      },
      onScroll () {
        const scrollY = window.scrollY;
        // scrollTop: 定位元素在页面中的原始高度，scrollY: 屏幕滚动的高度
        // scrollTop - scrollY : 物体距离屏幕顶部的高度
        // 这里为什么不能直接获取top?
        // 在setPosition直接设置了top为topSpace,所以在top<this.topSpace之后，top就会永远变为topSpace,不会变化，那么top<=this.topSpace永远成立
        if (this.scrollTop - scrollY <= this.topSpace) {
          this.setPosition();
        } else {
          this.stickyWrapper.style.position = 'static';
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll);
    }
  };
</script>

<style scoped lang="scss">
  .wd-sticky {
    &-placeholder {
      width: 100%;
    }
  }
</style>
