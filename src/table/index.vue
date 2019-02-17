<template>
  <div class="wd-table">
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
  };
</script>

<style lang="scss" scoped>
  .wd-table {

  }
</style>
