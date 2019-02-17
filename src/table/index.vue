<template>
  <div class="wd-table">
    <table>
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{col.title}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="data in dataSource" :key="data.key">
        <td v-for="item in data">
          {{item}}
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wd-table {

  }
</style>
