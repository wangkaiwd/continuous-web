<template>
  <div class="global-layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GlobalLayout',
    data () {
      return {
        layoutClass: {
          'has-sider': false,
        }
      }
    },
    mounted () {
      console.log('children', this.$children)
      this.$children.forEach((vm) => {
        if (vm.$options.name === 'GlobalSider') {
          this.layoutClass['has-sider'] = true
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .global-layout {
    display: flex;
    flex: 1;
    flex-direction: column;
    /*不通过设置宽度百分比的情况下实现元素高度为屏幕高度*/
    height: 100vh;
    background-color: skyblue;
    &.has-sider {flex-direction: row;}
  }
</style>