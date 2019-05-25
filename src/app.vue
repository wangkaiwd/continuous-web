<template>
  <div>
    <div class="component-wrapper">
      <self-cascader :options="options">
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
  export default {
    name: 'App',
    components: { SelfCascader, SelfButton },
    data () {
      return {
        options: prettyCities(chinaCitiesCopy)
      };
    },
    mounted () {
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
  }
</style>
