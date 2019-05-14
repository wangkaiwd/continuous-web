<template>
  <div>
    <div class="component-wrapper">
      <self-cascader>
        <self-button>Click</self-button>
      </self-cascader>
    </div>
  </div>
</template>
<script>
  import SelfCascader from './cascader/cascader';
  import SelfButton from './button';

  export default {
    name: 'App',
    components: { SelfCascader, SelfButton },
    data () {
      return {
        select: 'about1',
        select1: 'contact'
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
