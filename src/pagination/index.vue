<template>
  <div class="pagination">
    <div class="prev">
      <g-icon name="s-left"></g-icon>
    </div>
    <div class="numbers">
      <div class="first">1</div>
      <ul>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
      <div class="last">7</div>
    </div>
    <div class="next">
      <g-icon name="s-right"></g-icon>
    </div>
  </div>
</template>

<script>
  import GIcon from '../icon';

  export default {
    props: {
      hideOnSinglePage: {
        type: Boolean,
        default: true
      },
      total: {
        type: [String, Number],
        default: 0
      },
      current: {
        type: [String, Number],
        default: 1
      },
      change: {
        type: Function,
        default () {

        }
      }
    },
    name: 'WdPagination',
    components: { GIcon }
  };
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    .numbers {
      display: flex;
      ul {display: flex;}
    }
  }
</style>
