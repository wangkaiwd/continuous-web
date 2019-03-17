<template>
  <div>
    <div class="component-wrapper">
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
        总结：
          prop 和 组件名：会有大小写转换的过程，所以在html模板中书写的时候最好使用kebab-case短横线格式
          事件名：不会进行任何自动化的转换，但是推荐使用kebab-case短横线命名格式
      -->
      <div style="margin-bottom: 20px">
        文件内容不能超过500M
      </div>
      <wd-uploader
        name="file"
        method="post"
        action="http:localhost:9000/upload"
      >
        <g-button icon="upload">点击上传</g-button>
      </wd-uploader>
    </div>
  </div>
</template>
<script>
  import WdUploader from './upload';
  import GButton from './button';

  export default {
    name: 'App',
    components: { WdUploader, GButton },
    data () {
      return {
        current: 2,
        selectItem: [],
        columns: [ // 表头，对应列
          { id: 1, dataKey: 'name', title: '姓名' },
          { id: 2, dataKey: 'position', title: '位置' },
          { id: 3, dataKey: 'skill', title: '技能' },
          { id: 4, dataKey: 'score', title: '分数' },
          { id: 5, dataKey: 'age', title: '年龄' },
        ],
        // 排序规则： 升序：asc, 降序：desc, 默认序：false, 不能点击排序：不传入对应字段
        orderBy: {
          score: 'desc',
          age: 'asc',
          skill: false
        },
        dataSource: [ // 数据源，对应行
          { id: 1, name: '王昭君', position: '法师', skill: 4, score: 70, age: 20, description: '这是一个很漂亮的英雄，擅长使用冰雪法术' },
          { id: 2, name: '狄仁杰', position: '射手', skill: 4, score: 80, age: 12, description: '这是一个很帅气的英雄,掌管六扇门' },
          { id: 3, name: '李元芳', position: '打野', skill: 1, score: 40, age: 14 },
          { id: 4, name: '姜子牙', position: '辅助', skill: 2, score: 30, age: 82 },
          { id: 5, name: '程咬金', position: '上单', skill: 6, score: 90, age: 62 },
        ],
        loading: false
      };
    },
    mounted () {
    },
    methods: {
      // 模拟排序
      onSort () {
        this.loading = true;
        setTimeout(() => {
          // 通过ajax请求最新的排序数据
          // 模拟score字段排序
          this.dataSource.sort((a, b) => a.score - b.score);
          this.loading = false;
        }, 3000);
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
    .space {
      margin: 10px;
    }
  }
</style>
