<template>
  <div>
    <div class="component-wrapper">
      <self-cascader
        :options.sync="options"
        :selected.sync="selected"
        :load-data="loadData"
      >
      </self-cascader>
    </div>
  </div>
</template>
<script>
  import SelfCascader from './cascader/cascader';
  import SelfButton from './button';
  import chinaCities from './cascader/db';

  /*
  * 目前注意点：
  *   1. 如何递归处理数据，实现数据动态一层一层的加载
  *   2. 当涉及到动态数据的时候，要为数据添加一个新的属性:isLeaf
  * */

  const prettyCities = (chinaCitiesCopy) => {
    return chinaCitiesCopy.map(city => {
      if (city.child) {
        city.child = prettyCities(city.child);
      }
      const tempObject = {
        value: city.zipcode || city.id,
        label: city.name,
      };
      city.child && (tempObject.children = city.child);
      return tempObject;
    });
  };
  const ajax = (id) => {
    const chinaCitiesCopy = JSON.parse(JSON.stringify(chinaCities));
    const cities = prettyCities(chinaCitiesCopy);
    const citiesCopy = JSON.parse(JSON.stringify(cities));
    let result = null;
    if (typeof id === 'undefined') {
      result = citiesCopy.map(item => {
        const tempObj = { value: item.value, label: item.label, isLeaf: true };
        item.children && (tempObj.isLeaf = false);
        return tempObj;
      });
    } else {
      const iterate = (array, id) => {
        let result = {};
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          if (item.value === id) {
            result = item;
            result.isLeaf = true;
            if (result.children) {
              result.isLeaf = false;
              result.children.map(item => {
                item.isLeaf = true;
                if (item.children) {
                  item.isLeaf = false;
                  delete item.children;
                }
              });
            }
            break;
          } else {
            if (item.children) {
              result = iterate(item.children, id);
              if (Object.keys(result).length > 0) {
                break;
              }
            }
          }
        }
        return result;
      };
      result = iterate(citiesCopy, id);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 2000);
    });
  };
  export default {
    name: 'App',
    components: { SelfCascader, SelfButton },
    data () {
      return {
        options: [],
        selected: []
      };
    },
    mounted () {
      this.getFirstLevel();
    },
    methods: {
      // 帮用户处理通过id更新options的操作
      loadData (updateOptions) {
        const { selected } = this;
        const finalValue = selected[selected.length - 1].value;
        ajax(finalValue).then(
          res => {updateOptions(res);}
        );
      },
      getFirstLevel () {
        ajax().then(res => this.options = res);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
  }
</style>
