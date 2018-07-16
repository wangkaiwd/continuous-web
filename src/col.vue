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
  let validator = (val) => {
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
  export default {
    name: 'GlobalCol',
    props: {
      span: {
        type: [String, Number]
      },
      offset: {
        type: [String, Number]
      },
      ipad: {type: Object, validator,},
      narrowPc: {type: Object, validator},
      pc: {type: Object, validator},
      widePc: {type: Object, validator},
      largePc: {type: Object, validator}
    },
    data () {
      return {
        gutter: 0,
      }
    },
    methods: {
      createClass (obj, str) {
        const temp = []
        for (let p in obj) {
          if (obj.hasOwnProperty(p)) {
            if (p === 'span') {
              temp.push(`span-${str}-${obj[p]}`)
            }
            if (p === 'offset') {
              temp.push(`offset-${str}-${obj[p]}`)
            }
          }
        }
        return temp
      }
    },
    computed: {
      colStyle () {
        const {gutter} = this
        return {
          paddingRight: `${gutter}px`
        }
      },
      colClass () {
        const {span, offset, ipad, narrowPc, pc, widePc, largePc, createClass} = this
        return [
          span && `span-${span}`,
          offset && `offset-${offset}`,
          ...createClass(ipad, 'ipad'),
          ...createClass(narrowPc, 'narrowPc'),
          ...createClass(pc, 'pc'),
          ...createClass(widePc, 'widePc'),
          ...createClass(largePc, 'largePc')
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .global-col {
    /*通过scss循环生成所有情况，根据传的参数添加对应的类名*/
    /*默认是phone移动端*/
    @for $n from 1 through 24 {
      &.span-#{$n} {width: ($n / 24) * 100%;}
      /*设置为百分比的时候是相对于父元素的宽度*/
      &.offset-#{$n} {margin-left: ($n / 24) * 100%;}
    }
    /*ipad*/
    @media (min-width: 576px) {
      @for $n from 1 through 24 {
        &.span-ipad-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-ipad-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
    /*narrow-pc端*/
    @media (min-width: 768px) {
      @for $n from 1 through 24 {
        &.span-narrowPc-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-narrowPc-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
    /*pc端*/
    @media (min-width: 992px) {
      @for $n from 1 through 24 {
        &.span-pc-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-pc-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
    /*wide-pc端*/
    @media (min-width: 1200px) {
      @for $n from 1 through 24 {
        &.span-widePc-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-widePc-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
    /*large-pc端*/
    @media (min-width: 1600px) {
      @for $n from 1 through 24 {
        &.span-largePc-#{$n} {width: ($n / 24) * 100%;}
        /*设置为百分比的时候是相对于父元素的宽度*/
        &.offset-largePc-#{$n} {margin-left: ($n / 24) * 100%;}
      }
    }
  }
</style>
