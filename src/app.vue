<template>
  <div>
    <div class="component-wrapper">
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

  const chinaCitiesCopy = JSON.parse(JSON.stringify(chinaCities));
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
    const cities = prettyCities(chinaCitiesCopy);
    let result = null;
    if (typeof id === 'undefined') {
      result = cities.map(item => ({ value: item.value, label: item.label }));
    } else {
      const iterate = (array, id) => {
        return array.filter(item => {
          if (item.id === id) {
            return true;
          } else {
            if (item.children) {
              return item.children = iterate(item.children, id);
            } else {
              return false;
            }
          }
        });
      };
      result = iterate(cities, id);
      console.log('log', result);
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
        ajax(select[0].value).then(
          res => console.log(res)
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
