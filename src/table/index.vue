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
            :checked="allStatus"
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
        <td v-for="col in columns" :key="col.key">
          {{data[col.dataKey]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  /**
   * vue渲染元素问题：
   *  1. 要为每一个v-for循环添加 key值
   *  2. key值必须要唯一，且key值不能是索引，因为数组的索引在删除的时候会发生变化，只有在纯列表展示的时候使用key才不会出现问题，
   *    但还是使用唯一的key较好，不同一出现问题
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
    computed: {
      allStatus () {
        // 这里不能通过简单判断数组长度是否相等，要判断数组中的每一项id和另一项相同
        // this.dataSource.length === this.selectItem.length
        // 思路：
        //    1. 首先要数组的长度相同
        //    2. 将俩个数组根据id进行排序
        //    3. 将排序后的2个数组的每一项id进行对比，如果某一项不相等，则俩数组不相等，否则俩数组相同

        // sort: a - b 升序， b - a 降序。如何没有传参，则为字典序（按照英文顺序：查字典，会先显示a开头，之后才是b开头。之后类似）
        const allArray = this.dataSource.map(item => item.key).sort((a, b) => a - b);
        const selectArray = this.selectItem.map(item => item.key).sort((a, b) => a - b);
        if (allArray.length === selectArray.length) {
          let equal = true;
          for (let i = 0; i < selectArray.length; i++) {
            if (selectArray[i] !== allArray[i]) {
              equal = false;
              break;
            }
          }
          return equal;
        }
        return false;
      }
    },
    watch: {
      selectItem (newValue) {
        const selectLen = newValue.length, allLen = this.dataSource.length;
        this.$refs.allCheck.indeterminate = (selectLen > 0 && selectLen < allLen) ? true : false;
      }
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
          // const index = copy.indexOf(item);
          // this.selectItem = this.selectItem.filter((item, i) => i !== index);
          copy.splice(index, 1);
        }
        // if (selectLen > 0 && selectLen < allLen) {L
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
