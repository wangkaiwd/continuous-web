<template>
  <div class="global-row" :style="rowStyle">
    <slot :gutter="gutter"></slot>
  </div>
</template>
<script>
  /**
   * gutter属性设置的css技巧：
   *  1. 由于父元素宽度没有写死，所以可以通过负margin来撑开
   *  2. 父元素margin-right: -10px; 子元素margin-right: 10px;每个子元素都有向右的margin,但是并没有改变最后一个子元素的位置
   */
  export default {
    name: 'GlobalRow',
    props: {
      gutter: {
        type: [String, Number]
      }
    },
    data () {
      return {
        rowStyle: {
          marginRight: -this.gutter + 'px'
        }
      }
    },
    mounted () {
      // 为子组件传递gutter属性
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }

  // var div = document.createElement('div') // div  父组件：created
  // var childDiv = document.createElement('div') // child div  子组件：created
  // div.appendChild(childDiv) // 子组件：mounted
  // body.appendChild(div) // 父组件： mounted
</script>
<style lang="scss" scoped>
  .global-row {display: flex;}
</style>
