<template>
  <div>
    <div class="component-wrapper">
      <wd-checkbox v-model="checkStatus" :disabled="true"></wd-checkbox>
      <wd-checkbox v-model="checkStatus"></wd-checkbox>
      <wd-checkbox v-model="checkStatus1"></wd-checkbox>
      <wd-checkbox v-model="checkStatus" :disabled="true"></wd-checkbox>
    </div>
    <div class="component-wrapper">
      <wd-table
        :data-source="dataSource"
        :columns="columns"
      >
      </wd-table>
      <!--绑定style的时候，短横线(kebab-case)和驼峰(camelCase)命名都可以，但是html只支持短横线格式-->
      <!--
        字符串模板：new Vue({template:`<div>message</div>`})
        dom模板(html模板): <my-component></my-component>
      -->
      <!--
        组件：以.vue文件形式书写的话，驼峰命名和短横线格式都可以。以字符串模板书写只有短横线格式有效。
              强烈推荐遵循W3C规范中的自定义组件名（字母全小写且必须包含一个连字符）
        prop: HTML中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符,所以使用html模板时
              驼峰命名的prop,需要用其等价的kebab-case(短横线分隔命名)命名：
              props:['postTitle']
              <my-component post-title="postTitle"></my-component>
        事件名：事件名不存在任何自动化的大小写转换，触发的事件名需要完全匹配监听这个事件所用的名称,推荐始终使用kebab-case的事件名
      -->
      <wd-table
        style="margin-top: 20px;"
        :data-source="dataSource"
        :columns="columns"
        @change-select="onChangeSelect"
        bordered
      >
      </wd-table>
    </div>
    <div class="component-wrapper">
      <wdPagination :total="600" :current.sync="current"></wdPagination>
    </div>
  </div>
</template>
<script>
  import WdPagination from './pagination';
  import WdCheckbox from './checkbox1';
  import WdTable from './table';

  export default {
    name: 'App',
    components: { WdPagination, WdTable, WdCheckbox },
    data () {
      return {
        checkStatus: true,
        checkStatus1: false,
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
        ],
        selectItem: []
      };
    },
    mounted () {
    },
    methods: {
      onChangeSelect (data) {
        console.log('data', data);
        this.selectItem = data;
        console.log(this.selectItem);
      }
    }
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
    }
  }
</style>
