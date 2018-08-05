<template>
  <div class="tabs-nav">
    <!--匿名插槽-->
    <slot></slot>
    <!--具名插槽-->
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'globalTabsNav',
    inject: ['eventBus'],
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  .tabs-nav {
    display: flex;
    // 尽量用子元素选择器
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>