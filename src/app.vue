<template>
  <div>
    <div class="component-wrapper">
      
    </div>
  </div>
</template>
<script>
  import GSticky from './sticky';

  export default {
    name: 'App',
    components: { GSticky },
    data () {
      return {};
    },
    mounted () {
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
    /*max-height: calc(100vh - 80px);*/
    display: flex;
    /*align-items: center;*/
    justify-content: center;
    overflow: auto;
    .box {
      height: 2000px;
      width: 200px;
      background-color: green;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      width: 100%;
      background-color: red;
    }
    .space {
      margin: 10px;
    }
  }
</style>
