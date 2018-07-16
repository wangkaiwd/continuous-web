<template>
  <div class="global-col" :class="colClass" :style="colStyle">
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
      phone: {
        type: Object,
        validator (val) {
          let valid = true, isObject = false
          for (let p in val) {
            isObject = true
            if (val.hasOwnProperty(p)) {
              valid = ['offset', 'span'].includes(p)
              if (valid) break
            }
          }
          return valid && isObject
        }
      }
    },
    data () {
      return {
        gutter: 0,
        align: 'left',
      }
    },
    computed: {
      colStyle () {
        const {gutter} = this
        return {
          marginRight: `${gutter}px`
        }
      },
      colClass () {
        const {span, offset, align, phone} = this
        const temp = []
        for (let p in phone) {
          if (p === 'span') {
            temp.push(`span-phone-${phone[p]}`)
          }
          if (p === 'offset') {
            temp.push(`offset-phone-${phone[p]}`)
          }
        }
        return [
          span && `span-${span}`,
          offset && `offset-${offset}`,
          align && `align-${align}`,
          ...temp
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .global-col {display: flex;height: 40px;background-color: skyblue;border: 1px solid red;width: 50%;
    &.align-right {justify-content: flex-end;}
    &.align-left {justify-content: space-around;}
    &.align-center {justify-content: center;}
    /*通过scss循环生成所有情况，根据传的参数添加对应的类名*/
    @for $n from 1 through 24 {
      &.span-#{$n} {width: ($n / 24) * 100%;}
      /*设置为百分比的时候是相对于父元素的宽度*/
      &.offset-#{$n} {margin-left: ($n / 24) * 100%;}
    }
    @media (max-width: 576px) {
      @for $n from 1 through 24 {
        &.span-phone-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-phone-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
  }
</style>
