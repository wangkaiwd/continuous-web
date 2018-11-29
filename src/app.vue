<template>
  <div class="component-wrapper">
    <g-slide></g-slide>
  </div>
</template>
<script>
  import GSlide from './slide/slide'

  export default {
    name: 'App',
    components: {GSlide},
    data () {
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .col,
  .col-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 10px;
    background-color: rgba(0, 160, 233, 0.7);
  }

  .col-right {
    background-color: rgba(0, 0, 0, .1);
  }
</style>