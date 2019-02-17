<template>
  <div class="component-wrapper">

  </div>
  <div class="component-wrapper">
    <wd-pagination :total="600" :current.sync="current"></wd-pagination>
  </div>
</template>
<script>
  import WdPagination from './pagination';
  import WdTable from './table';

  export default {
    name: 'App',
    components: {WdPagination, WdTable},
    data () {
      return {
        current: 2,
        columns: [],
        dataSource: [
          {key: 1, name: '小熊猫', score: 83},
          {key: 2, name: '小袋鼠', score: 90}
        ]
      };
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
