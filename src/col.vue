<template>
  <div
    class="global-col"
    :class="[span && `span-${span}`,offset && `offset-${offset}`]"
  >
    <slot></slot>
  </div>
</template>
<script>
  // 自己的想法：通过flex来控制份数，将份数通过style来进行一个动态控制flex属性
  /**
   * flex属性回忆：
   *  1. flex-wrap: nowrap; // 默认属性是nowrap，不换行
   *  2. flex-shrink: 1; // 默认会缩小
   *  3. flex-grow: 0; // 默认不会放大
   */
  export default {
    name: 'GlobalCol',
    props: {
      span: {
        type: [String, Number]
      },
      offset: {
        type: [String, Number]
      },
    },
  }
</script>
<style lang="scss" scoped>
  /*.global-col {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: skyblue;
    border: 1px solid red;
    flex: 1;
  }*/
  .global-col {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: skyblue;
    border: 1px solid red;
    width: 50%;
    /*通过scss循环生成所有情况，让根据传的参数添加对应的类名*/
    @for $n from 1 through 24 {
      &.span-#{$n} {
        width: ($n / 24) * 100%;
      }
      &.offset-#{$n} {
        /*设置为百分比的时候是相对于父元素的宽度*/
        margin-left: ($n / 24) * 100%;
      }
    }
  }
</style>
