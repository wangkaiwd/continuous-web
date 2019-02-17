<template>
  <div>
    <div class="component-wrapper">
      <wd-table
        :data-source="dataSource"
        :columns="columns"
      >
      </wd-table>
      <!--绑定style的时候，短横线(kebab-case)和驼峰(camelCase)命名都可以，但是html只支持短横线格式-->
      <wd-table
        style="margin-top: 20px;"
        :data-source="dataSource"
        :columns="columns"
        bordered
      >
      </wd-table>
    </div>
    <div class="component-wrapper">
      <wd-pagination :total="600" :current.sync="current"></wd-pagination>
    </div>
  </div>
</template>
<script>
  import WdPagination from './pagination'
  import WdTable from './table'

  export default {
    name: 'App',
    components: {WdPagination, WdTable},
    data () {
      return {
        current: 2,
        columns: [
          {
            key: 1,
            title: '姓名',
            dataKey: 'name'
          },
          {
            key: 2,
            title: '分数',
            dataKey: 'score'
          }
        ],
        dataSource: [
          {key: 1, name: '小熊猫', score: 83},
          {key: 2, name: '小袋鼠', score: 90},
          {key: 3, name: '小松鼠', score: 100},
          {key: 4, name: '青蛙', score: 19},
          {key: 5, name: '雷神', score: 80},
          // {key: 6, name: '钢铁侠', score: 40},
          // {key: 7, name: '闪电侠', score: 10},
          // {key: 8, name: '蜗牛', score: 10},
          // {key: 9, name: '兔子', score: 92},
          // {key: 10, name: '花生米', score: 11},
        ]
      }
    },
    mounted () {
    },
    methods: {}
  }
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
