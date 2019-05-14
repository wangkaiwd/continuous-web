<template>
  <div>
    <div class="component-wrapper">
      <self-cascader :options="options">
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
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [
              {
                label: '杭州',
                value: 'hangzhou',
                children: [
                  {
                    label: '西湖',
                    value: 'xihu'
                  }
                ]
              }
            ]
          },
          {
            label: '内蒙古',
            value: 'neimenggu',
            children: [
              {
                label: '呼和浩特',
                value: 'huhehaote',
                children: [
                  {
                    label: '呼伦贝尔',
                    value: 'hulunbeier'
                  }
                ]
              }
            ]
          }
        ]
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
