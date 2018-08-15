<template>
    <div class="popover">
        <!--只有修饰符 @click.stop-->
        <div class="content-wrapper" ref="contentWrapper" v-show="visible" @click.stop>
            <!--slot添加事件和class都是没有作用的-->
            <slot name="content"></slot>
        </div>
        <div class="button-wrapper" ref="buttonWrapper" @click.stop="toggleContent">
            <slot name="trigger"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Popover',
    data () {
      return {visible: false}
    },
    mounted () {
      this.$nextTick(() => {
        const contentWrapper = this.$refs.contentWrapper
        const buttonWrapper = this.$refs.buttonWrapper
        document.body.appendChild(contentWrapper)
        // 这样获取到的 left,top会被定位的父元素影响
        // const left = buttonWrapper.offsetLeft + 'px'
        // const top = buttonWrapper.offsetTop + 'px'
        // window.scrollY:返回页面的水平滚动距离
        // document.documentElement.scrollTop: 整张网页的垂直滚动距离
        // left,top是元素左上角相对于视口左上角的横纵坐标
        const {left, top} = buttonWrapper.getBoundingClientRect()
        contentWrapper.style.left = left + 'px'
        contentWrapper.style.top = top + window.scrollY + 'px'
      })
    },
    methods: {
      toggleContent () {
        this.visible = !this.visible
        // 如果visible是true才需要添加事件，如果是false的话，将visible为true时的事件移除
        /**
         * 简短代码：看起来精简，但是不方便调试，不太方便阅读
         * 多行代码：看起来占用行数较多，但是方便调试，方便阅读
         */
        this.visible ?
          document.addEventListener('click', this.listenClick)
          :
          document.removeEventListener('click', this.listenClick)
        // if (this.visible) {
        //   console.log('添加事件')
        //   document.addEventListener('click', this.listenClick)
        // }
        // if (!this.visible) {
        //   console.log('删除事件')
        //   document.removeEventListener('click', this.listenClick)
        // }
      },
      listenClick () {
        this.visible = false
        document.removeEventListener('click', this.listenClick)
        console.log('删除事件')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .popover {
        display: inline-block;
        vertical-align: top;
    }

    .content-wrapper {
        position: absolute;
        /* 元素设置定位之后的偏移量是根据父元素的宽(left)高(top)来进行计算的 */
        background-color: skyblue;
        box-shadow: 0 0 3px rgba(0, 0, 0, .5);
        transform: translateY(-100%);
    }
</style>