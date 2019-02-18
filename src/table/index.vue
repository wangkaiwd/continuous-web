<template>
  <div class="wd-table">
    <table :class="{bordered,stripe}">
      <thead>
      <tr>
        <th><input type="checkbox"></th>
        <th v-for="col in columns" :key="col.key">
          {{col.title}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data,i) in dataSource" :key="data.key">
        <td><input type="checkbox" @change="changeSelect($event,data,i)"></td>
        <td v-for="col in columns">
          {{data[col.dataKey]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'WdTable',
    props: {
      columns: {
        type: Array,
        default: []
      },
      dataSource: {
        type: Array,
        default: []
      },
      stripe: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectItem: []
      };
    },
    methods: {
      changeSelect (e, item, i) {
        // 将所有选中项组成数组
        // console.log(e.target.checked, item, i);
        // if (e.target.checked) {
        //   this.selectItem.push(item);
        // } else {
        //   this.selectItem.findIndex()
        // }
        this.$emit('change-select', { selected: e.target.checked, item, i });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .wd-table {
    table {
      width: 100%;
      /*border: 1px solid red;*/
    }
    .bordered {
      td, th {
        border: 1px solid #e8e8e8;
      }
    }
    .stripe {
      tbody {
        tr:nth-child(even) {
          background-color: #FAFAFA;
        }
      }
    }
    td, th {
      padding: 8px;
      border-bottom: 1px solid #e8e8e8;
      line-height: 1.2;
    }
  }
</style>
