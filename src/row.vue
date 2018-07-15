<template>
  <div class="global-row">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GlobalRow',

  }
</script>
<style lang="scss" scoped>
  .global-row {
    display: flex;
  }
</style>
