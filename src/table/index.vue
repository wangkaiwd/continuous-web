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
      <tr v-for="data in dataSource" :key="data.key">
        <td><input type="checkbox"></td>
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
    }
  }
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
    }
  }
</style>
