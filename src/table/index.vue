<template>
  <div class="wd-table">
    <table :class="{bordered,stripe}">
      <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            ref="allCheck"
            @change="onChangeAllItem"
            :checked="dataSource.length === selectItem.length"
          >
        </th>
        <th v-for="col in columns" :key="col.key">
          {{col.title}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data,i) in dataSource" :key="data.key">
        <td>
          <input
            type="checkbox"
            @change="changeSelect($event,data,i)"
            :checked="selectItem.findIndex(item => item.key === data.key) > -1"
          >
        </td>
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
        default: () => []
      },
      dataSource: {
        type: Array,
        default: () => []
      },
      stripe: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: false
      },
      selectItem: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {};
    },
    methods: {
      changeSelect (e, item) {
        const copy = JSON.parse(JSON.stringify(this.selectItem));
        // 将所有选中项组成数组
        if (e.target.checked) {
          copy.push(item);
        } else {
          // 当数组的内容是对象或其它复杂数据结构的时候，要将引用内容传来，才能得到正确的index
          const index = copy.findIndex(one => one.key === item.key);
          // this.selectItem = this.selectItem.filter((item, i) => i !== index);
          copy.splice(index, 1);
        }
        const selectLen = copy.length, allLen = this.dataSource.length;
        this.$refs.allCheck.indeterminate = (selectLen > 0 && selectLen < allLen) ? true : false;
        // if (selectLen > 0 && selectLen < allLen) {
        //   this.$refs.allCheck.indeterminate = true;
        // } else {
        //   this.$refs.allCheck.indeterminate = false;
        // }
        this.$emit('update:selectItem', copy);
      },
      onChangeAllItem (e) {
        const { checked } = e.target;
        if (checked) {
          this.$emit('update:selectItem', this.dataSource);
        } else {
          this.$emit('update:selectItem', []);
        }
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
