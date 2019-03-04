<template>
  <div class="wd-table">
    <table :class="{striped,bordered}">
      <thead>
      <tr>
        <th>
          <input type="checkbox" @change="onAllItemChange" :checked="isAllCheck" ref="allChangeInput">
        </th>
        <th v-for="col in columns" :key="col.id">{{col.title}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="data in dataSource" :key="data.id">
        <td>
          <input
            type="checkbox"
            @change="onItemChange($event,data)"
            :checked="selectItem.some(item => item.id === data.id)"
          >
        </td>
        <td v-for="col in columns" :key="col.id">
          {{data[col.dataKey]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  /**
   * api 分析：
   *  1. columns
   *  2. dataSource
   *  3. 全选反选
   *  4. bordered
   *  5. striped
   */
  export default {
    name: 'WdTable',
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      dataSource: {
        type: Array,
        default: () => []
      },
      bordered: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: true
      },
      selectItem: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      selectItem (newVal) {
        const checked = newVal.length > 0 && newVal.length < this.dataSource.length;
        this.$refs.allChangeInput.indeterminate = checked;
      }
    },
    computed: {
      isAllCheck () {
        if (this.selectItem.length === this.dataSource.length) {
          return true;
        }
        return false;
      }
    },
    methods: {
      onItemChange (e, item) {
        const copyItem = JSON.parse(JSON.stringify(this.selectItem));
        const { checked } = e.target;
        if (checked) {
          copyItem.push(item);
        } else {
          const index = copyItem.findIndex(one => one.id === item.id);
          copyItem.splice(index, 1);
        }
        this.$emit('update:select-item', copyItem);
      },
      onAllItemChange (e) {
        const { checked } = e.target;
        if (checked) {
          this.$emit('update:select-item', this.dataSource);
        } else {
          this.$emit('update:select-item', []);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../var";

  .wd-table {
    table {
      width: 100%;
      /*border-collapse：用来决定表格的边框是分开的还是合并的*/
      border-collapse: collapse;
    }
    thead {
      /*background-color: #f5f5f5;*/
    }
    tr {
      border-bottom: 1px solid $border-color-light;
    }
    th, td {
      padding: 8px;
    }
    .striped {
      tbody {
        tr:nth-child(even) {
          background-color: $gray;
        }
      }
    }
    .bordered {
      td, th {
        border: 1px solid $border-color-light;
      }
    }
  }
</style>