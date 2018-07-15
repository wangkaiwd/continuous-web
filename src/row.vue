<template>
  <div class="global-row" :class="`gutter-${gutter}`">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GlobalRow',
    props: {
      gutter: {
        type: [String, Number]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .global-row {display: flex;
    @for $n from 1 through 24 {
      &.gutter-#{n} {
        .global-col:not(:last-child) {margin-right: 12px;}
      }
    }
  }
</style>
