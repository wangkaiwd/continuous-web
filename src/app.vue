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
        return array.filter(item => {
          if (item.value === id) {
            return true;
          } else {
            if (item.children) {
              item.children = iterate(item.children, id);
            }
          }
        });
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
        ajax(select[0].value).then(
          res => console.log('res', res)
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
