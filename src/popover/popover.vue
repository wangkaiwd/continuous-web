<template>
  <div class="popover">
    <div class="content-wrapper" v-show="visible">
      <slot name="content"></slot>
    </div>
    <div class="button-wrapper" @click="toggleContent">
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
      // document.body.addEventListener('click', () => {
      //   this.visible = false
      //   console.log('点击body就关闭Popover')
      // })
      // body会被内容撑开，如果没有单独设置的话，是页面内容区域，而document是整个页面
      // document.addEventListener('click', () => {
      //   this.visible = false
      //   console.log('点击body就关闭Popover')
      // })
    },
    methods: {
      toggleContent () {
        this.visible = !this.visible
        console.log('切换visible')
        this.$nextTick(() => {
          // document.removeEventListener('click', this.listenClick)
          // document.addEventListener('click', () => {
          //   this.visible = false
          //   console.log('点击body就关闭Popover')
          // })
          // document.addEventListener('click', this.listenClick)
          // console.log('新增监听器')
          // bind会返回一个新的函数,所以 x 和 x.bind(this) 不是同一个函数,所以不能移除监听器
          // document.addEventListener('click', function x () {
          //   this.visible = false
          //   console.log('点击body就关闭Popover')
          //   console.log('删除监听器')
          //   document.removeEventListener('click', x)
          // }.bind(this))
          let listenClick = () => {
            this.visible = false
            console.log('删除事件')
            document.removeEventListener('click', listenClick)
          }
          console.log('添加事件')
          document.addEventListener('click', listenClick)
        })
      },
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