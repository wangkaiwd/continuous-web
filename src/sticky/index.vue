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
        this.scrollTop = stickyWrapper.getBoundingClientRect().top;
      },
      setPosition () {
        const { stickPlaceholder, stickyWrapper } = this;
        const { left } = stickPlaceholder.getBoundingClientRect();
        stickyWrapper.style.position = 'fixed';
        stickyWrapper.style.width = stickPlaceholder.offsetWidth + 'px';
        stickyWrapper.style.left = left + 'px';
        stickyWrapper.style.top = this.topSpace + 'px';
        stickPlaceholder.style.height = stickyWrapper.offsetHeight + 'px';
      },
      onScroll () {
        const scrollY = window.scrollY;
        // scrollTop: 定位元素在页面中的原始高度，scrollY: 屏幕滚动的高度
        // scrollTop - scrollY : 物体距离屏幕顶部的高度
        if (this.topSpace > this.scrollTop) {
          console.warn('设置的高度大于元素距离顶部的距离，定位无法生效');
          return;
        }
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
