<template>
  <div class="popover">
    <!--只有修饰符 @click.stop-->
    <div class="content-wrapper" ref="contentWrapper" v-if="visible">
      <!--slot添加事件和class都是没有作用的-->
      <slot name="content"></slot>
    </div>
    <div class="button-wrapper" ref="buttonWrapper" @click="toggleContent">
      <slot name="trigger"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popover',
    data () {
      return {
        visible: false,
      }
    },
    mounted () {
      // 使用v-if页面中不会有这个元素，所以无法获取dom对象
      // this.$nextTick(() => {
      // const contentWrapper = this.$refs.contentWrapper
      // const buttonWrapper = this.$refs.buttonWrapper
      // document.body.appendChild(contentWrapper)
      // 这样获取到的 left,top会被定位的父元素影响
      // const left = buttonWrapper.offsetLeft + 'px'
      // const top = buttonWrapper.offsetTop + 'px'
      // window.scrollY:返回页面的水平滚动距离
      // document.documentElement.scrollTop: 整张网页的垂直滚动距离
      // left,top是元素左上角相对于视口左上角的横纵坐标
      // const {left, top} = buttonWrapper.getBoundingClientRect()
      // contentWrapper.style.left = left + 'px'
      // contentWrapper.style.top = top + window.scrollY + 'px'
      // })
    },
    methods: {
      toggleContent () {
        this.visible = !this.visible
        // if (this.visible) { // 设置为true时，会有一个dom队列
        //   // console.log(this.$refs.contentWrapper) // 获取不到dom,队列中的内容会异步执行
        // }
        this.$nextTick(() => {
          if (this.visible) {
            this.moveContent()
            document.addEventListener('click', this.listenClick)
          }
          if (!this.visible) {
            document.removeEventListener('click', this.listenClick)
          }
        })

        // 如果visible是true才需要添加事件，如果是false的话，将visible为true时的事件移除
        /**
         * 简短代码：看起来精简，但是不方便调试，不太方便阅读
         * 多行代码：看起来占用行数较多，但是方便调试，方便阅读
         */
        // this.visible ?
        //   document.addEventListener('click', this.listenClick)
        //   :
        //   document.removeEventListener('click', this.listenClick)
        // if (this.visible) { // 设置为true时，会有一个dom队列
        //   // console.log(this.$refs.contentWrapper) // 获取不到dom,队列中的内容会异步执行
        //   this.$nextTick(() => {
        //     this.moveContent()
        //     console.log('添加事件')
        //     document.addEventListener('click', this.listenClick)
        //   })
        // }
        // if (!this.visible) {
        //   console.log('删除事件')
        //   document.removeEventListener('click', this.listenClick)
        // }
      },
      listenClick (e) {
        // contains: node.contains(otherNode) 如果otherNode是node的后代节点或是node节点本身，则返回true,否则返回false
        if (this.$refs.contentWrapper.contains(e.target) || this.$refs.buttonWrapper.contains(e.target)) {

        } else {
          this.visible = false
          document.removeEventListener('click', this.listenClick)
        }
      },
      moveContent () {
        const contentWrapper = this.$refs.contentWrapper
        const buttonWrapper = this.$refs.buttonWrapper
        document.body.appendChild(contentWrapper)
        // getBoundingClientRect()方法获取到的left,top是相对视口左上角的坐标
        const {left, top} = buttonWrapper.getBoundingClientRect()
        contentWrapper.style.left = left + window.scrollX + 'px'
        contentWrapper.style.top = top + window.scrollY + 'px'
      },
      yyy () {
        console.log('yyy')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: #999;
  $border-radius: 4px;
  .popover {
    display: inline-block;
    vertical-align: top;
  }

  .content-wrapper {
    position: absolute;
    /* 元素设置定位之后的偏移量是根据父元素的宽(left)高(top)来进行计算的 */
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 0.5em 1em;
    /*box-shadow: 0 0 3px rgba(0, 0, 0, .5);*/
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, .5));
    background-color: #fff;
    max-width: 20em;
    /* 允许在单词内换行*/
    word-break: break-all;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 10px;
      display: block;
      width: 0;
      height: 0;
      border-width: 10px 10px 0;
      border-style: solid;
      border-color: #999 transparent;
    }
    &::after {
      border-color: #fff transparent;
      top: calc(100% - 1px);
    }
  }
</style>