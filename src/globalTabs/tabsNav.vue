<template>
  <div class="tabs-nav">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>

<script>
  export default {
    name: 'globalTabsNav'
  }
</script>

<style scoped>

</style>