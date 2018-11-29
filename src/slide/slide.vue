<template>
  <div class="slide">
    <div class="slide-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GSlide',
    data () {
      return {}
    },
    mounted () {
      console.log('children', this.$children)
    }
  }
</script>

<style lang="scss" scoped>
  .slide {
    &-window {
      display: flex;
    }
  }
</style>