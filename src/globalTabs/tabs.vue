<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'globalTabs',
    props: {
      selected: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator (val) {
          return ['horizontal', 'vertical'].indexOf(val) > -1
        }
      }
    }
  }
</script>

<style scoped>

</style>