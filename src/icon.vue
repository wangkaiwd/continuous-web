<template>
  <svg
    class="g-icon"
    aria-hidden="true"
  >
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
  import './svg'

  export default {
    name: 'GlobalIcon',
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .g-icon {
    width: 1em;
    height: 1em;
    vertical-align: top;
    fill: currentColor;
    overflow: hidden;
  }
</style>
