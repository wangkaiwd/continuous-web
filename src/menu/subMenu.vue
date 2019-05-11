<template>
  <div class="self-sub-menu">
    <div class="self-sub-menu-title">
      <slot name="title"></slot>
    </div>
    <div class="self-sub-menu-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelfSubMenu'
  };
</script>

<style lang="scss" scoped>
  .self-sub-menu {
    position: relative;
    &-title {
      padding: 1em 2em;
    }
    &-item {
      border: 1px solid blue;
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      word-break: break-all;
    }
  }
</style>
