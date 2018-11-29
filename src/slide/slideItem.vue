<template>
  <div class="slide-item" v-if="visible">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GSlideItem',
    data () {
      return {
        visible: false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>