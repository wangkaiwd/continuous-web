<template>
  <div class="component-wrapper">
    <wd-pagination></wd-pagination>
  </div>
</template>
<script>
  import WdPagination from './pagination';

  export default {
    name: 'App',
    components: { WdPagination },
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
    .box {
      width: 100%;
      height: 400px;
      background-color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 100px;
      color: red;
      font-weight: bold;
    }
  }
</style>
