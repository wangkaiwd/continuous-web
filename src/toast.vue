<template>
  <div class="global-toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GlobalToast'
  }
</script>

<style lang="scss" scoped>
  .global-toast {position: fixed;top: 0;left: 50%;transform: translateX(-50%);color: #fff;background: rgba(0, 0, 0, 0.74);
    border-radius: 4px;box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);padding: 8px 16px;
  }
</style>