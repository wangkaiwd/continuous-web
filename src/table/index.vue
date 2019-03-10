<template>
  <div class="wd-table">
    <table :class="{striped,bordered}">
      <thead>
      <tr>
        <th v-if="expandable"></th>
        <th v-if="selectable" class="wd-table-center">
          <input
            type="checkbox"
            @change="onAllItemChange"
            :checked="isAllCheck"
            ref="allChangeInput"
          >
        </th>
        <th v-for="col in columns" :key="col.id">
          <div class="wd-table-header">
            {{col.title}}
            <span
              class="wd-table-sorter"
              v-if="col.dataKey in orderBy"
              @click="changeSort(col.dataKey)"
            >
              <!--可以使用in方法来替代下面这段代码-->
              <!--v-if="Object.keys(orderBy).includes(col.dataKey)"-->
              <g-icon name="ascend" :class="{active:orderBy[col.dataKey] === 'asc'}"></g-icon>
              <g-icon name="descend" :class="{active:orderBy[col.dataKey] === 'desc'}"></g-icon>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(data,i) in dataSource">
        <tr :key="data.id">
          <td v-if="expandable" class="wd-table-center">
            <g-icon
              v-if="data[expandKey]"
              :ref="`expandIcon${data.id}`"
              class="wd-table-expand-icon"
              @click="onChangeExpand(data.id)"
              name="s-right"
            >
            </g-icon>
          </td>
          <td v-if="selectable" class="wd-table-center">
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
        <!--colspan: 规定单元格可以横跨的列数-->
        <!--rowspan: 规定单元格可以横跨的行数-->
        <!--这里的key如果继续设置为col.id的话，会导致和上边tr的key重复，所以这里可以加一个后缀-->
        <tr :ref="`active${data.id}`" :key="`${data.id}-expand`" class="wd-table-expand">
          <td class="placeholder"></td>
          <td :colspan="columns.length+2">
            {{data[expandKey]}}
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <div v-if="loading" class="wd-table-loading-wrapper">
      <g-icon class="wd-table-loading" name="loading"></g-icon>
    </div>
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
  import GIcon from '../icon';

  export default {
    name: 'WdTable',
    components: { GIcon },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      dataSource: {
        type: Array,
        default: () => [],
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
      },
      selectable: {
        type: Boolean,
        default: false
      },
      expandable: {
        type: Boolean,
        default: false
      },
      expandKey: {
        type: String
      },
      orderBy: {
        type: Object,
        default: () => ({}),
        // validator无法获取this，无法根据
        // validator: () => {
        //   console.log('this', this);
        //   return true;
        // }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // expanded: false
      };
    },
    watch: {
      selectItem (newVal) {
        const checked = newVal.length > 0 && newVal.length < this.dataSource.length;
        this.$refs.allChangeInput.indeterminate = checked;
      }
    },
    computed: {
      isAllCheck () {
        const { dataSource, selectItem } = this;
        //  要选中项中的每一个元素都和dataSource中的元素相同才会全选
        // dataSource和selectItem的长度首先要相同
        // 1. 排序
        // 2. 排序之后将id进行一一对比
        let equal = false;
        if (dataSource.length === selectItem.length) {
          // 获取排序后的id组成的数组
          const allIds = dataSource.map(item => item.id).sort((a, b) => a - b);
          const selectIds = selectItem.map(item => item.id).sort((a, b) => a - b);
          for (let i = 0; i < allIds.length; i++) {
            if (allIds[i] !== selectIds[i]) break;
          }
          equal = true;
        }
        return equal;
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
      },
      changeSort (dataKey) {
        const copy = JSON.parse(JSON.stringify(this.orderBy));
        switch (copy[dataKey]) {
          case 'asc':
            copy[dataKey] = 'desc';
            break;
          case 'desc':
            copy[dataKey] = false;
            break;
          default:
            copy[dataKey] = 'asc';
            break;
        }
        this.$emit('update:orderBy', copy);
      },
      onChangeExpand (id) {
        const item = this.$refs[`active${id}`][0];
        const icon = this.$refs[`expandIcon${id}`][0].$el;
        if (item.classList.contains('active')) {
          icon.classList.remove('wd-table-expand-rotate');
          item.classList.remove('active');
        } else {
          icon.classList.add('wd-table-expand-rotate');
          item.classList.add('active');
        }
      }
    },
  };
</script>

<style scoped lang="scss">
  @import "../var";

  .wd-table {
    position: relative;
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
    &-header {
      display: flex;
      align-items: center;
    }
    &-sorter {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 6px;
      cursor: pointer;
      color: $border-color-light;
      svg {
        width: 10px;
        height: 10px;
      }
      .active {
        color: #333333;
      }
    }
    &-loading-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, .6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
    }
    &-loading {
      @include loading;
      color: darken($gray, 40%);
    }
    &-expand {
      display: none;
      &.active {
        display: table-row;
        td {
          border: none;
        }
      }
      &-icon {
        color: darken($gray, 40%);
        transition: all .2s;
        cursor: pointer;
      }
      /*g-icon wd-table-expand-icon wd-table-expand-rotate*/
      &-rotate {
        transform: rotate(90deg);
      }
    }
    &-center {
      text-align: center;
    }
  }
</style>