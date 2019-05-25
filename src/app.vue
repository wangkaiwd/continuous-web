<template>
  <div>
    <div class="component-wrapper">
      {{options}}
      <self-cascader
        :options="options"
        :selected.sync="selected"
        @update:selected="onUpdateSelected"
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
      result = citiesCopy.map(item => ({ value: item.value, label: item.label }));
    } else {
      const iterate = (array, id) => {
        let result = {};
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          if (item.value === id) {
            result = item;
            if (result.children) {
              result.children.map(item => {
                delete item.children;
              });
            }
            break;
          } else {
            if (item.children) {
              result = iterate(item.children, id);
              if (result) {
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
      onUpdateSelected (select) {
        const finalValue = select[select.length - 1].value;
        ajax(finalValue).then(
          res => {
            const updateOptions = (options, res) => {
              return options.map(option => {
                if (option.value === res.value) {
                  res.children && (option.children = res.children);
                } else {
                  if (option.children) {
                    updateOptions(option.children, res);
                  }
                }
                return option;
              });
            };
            const newOptions = updateOptions(this.options, res);
            this.options = newOptions;
          }
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
