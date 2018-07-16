<template>
  <div class="global-row" :class="rowClass" :style="rowStyle">
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
      },
      align: {
        type: String,
        validator (val) {
          // console.log('val', val) // 不传align的话不会只执行这句话
          // 学习includes()方法：判断一个数组是否包含指定的值，根据情况，如果包含则返回true,否则返回false
          // return ['left','right','center'].includes();
          return ['left', 'right', 'center'].indexOf(val) !== -1
        }
      }
    },
    data () {
      return {
        rowStyle: {
          marginRight: -this.gutter + 'px'
        },
        rowClass: [this.align && `align-${this.align}`]
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
  .global-row {display: flex;flex-wrap: wrap;
    &.align-right {justify-content: flex-end;}
    &.align-left {justify-content: space-around;}
    &.align-center {justify-content: center;}
  }
</style>
