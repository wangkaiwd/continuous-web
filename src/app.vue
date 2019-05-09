<template>
  <div>
    <div class="component-wrapper">
      <self-menu>
        <self-menu-item>首页</self-menu-item>
        <self-menu-item>关于</self-menu-item>
        <self-menu-item>联系方式</self-menu-item>
      </self-menu>
    </div>
  </div>
</template>
<script>
  import SelfMenu from 'menu/menu';
  import SelfSubMenu from 'menu/subMenu';
  import SelfMenuItem from 'menu/menuItem';

  export default {
    name: 'App',
    components: { SelfMenu, SelfMenuItem, SelfSubMenu },
    data () {
      return {};
    },
    mounted () {
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
    display: flex;
    justify-content: center;
    overflow: auto;
    .box {
      height: 2000px;
      width: 200px;
      background-color: green;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      width: 100%;
      background-color: red;
    }
    .space {
      margin: 10px;
    }
  }
</style>
