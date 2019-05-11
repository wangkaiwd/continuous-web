<template>
  <div class="self-menu">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * provide和inject:
   *    这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系
   *    成立的时间里始终生效。这个特性和Rect的上下文(Context API)特性很相似。
   *
   * provide: 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。
   * inject: 1. 字符串数组 2. 对象，可以通过default来设置默认值
   */
  export default {
    name: 'SelfMenu',
    props: {
      selected: { type: String }
    },
    provide () {
      return {
        rootMenu: this
      };
    },
    methods: {
      updateSelected (vm) {
        this.$emit('update:selected', vm.name);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .self-menu {
    display: flex;
    border: 1px solid red;
  }
</style>
