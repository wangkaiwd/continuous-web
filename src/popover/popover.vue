<template>
  <div class="popover">
    <div class="content-wrapper" v-show="visible">
      <slot name="content"></slot>
    </div>
    <div class="button-wrapper" @click.stop="toggleContent">
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
      console.log('添加事件')
      document.addEventListener('click', this.listenClick)
    },
    deactivated () {
      console.log('删除事件')
      document.removeEventListener('click', this.listenClick)
    },
    methods: {
      toggleContent () {
        this.visible = !this.visible
        // this.$nextTick(() => {
        //   // document.removeEventListener('click', this.listenClick)
        //   // document.addEventListener('click', () => {
        //   //   this.visible = false
        //   //   console.log('点击body就关闭Popover')
        //   // })
        //   // document.addEventListener('click', this.listenClick)
        //   // console.log('新增监听器')
        //   // bind会返回一个新的函数,所以 x 和 x.bind(this) 不是同一个函数,所以不能移除监听器
        //   // document.addEventListener('click', function x () {
        //   //   this.visible = false
        //   //   console.log('点击body就关闭Popover')
        //   //   console.log('删除监听器')
        //   //   document.removeEventListener('click', x)
        //   // }.bind(this))
        //   let listenClick = () => {
        //     this.visible = false
        //     console.log('删除事件')
        //     document.removeEventListener('click', listenClick)
        //   }
        //   console.log('添加事件')
        //   document.addEventListener('click', listenClick)
        // })
      },
      listenClick () {
        console.log('click')
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popover {
    position: relative;display: inline-block;vertical-align: top;
    .content-wrapper {position: absolute;
      /* 元素设置定位之后的偏移量是根据父元素的宽(left)高(top)来进行计算的 */
      bottom: 100%;left: 0;border: 1px solid red;box-shadow: 0 0 3px rgba(0, 0, 0, .5);
    }
  }
</style>