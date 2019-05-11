<template>
  <div>
    <div class="component-wrapper">
      <!--
          defaultSelected: []
          1. 首先完成最简单的1级菜单
          2. 然后完成对应的二级菜单
          3. 最后完成层级的递归
          -->
      <self-menu :selected.sync="select">
        <self-menu-item name="home">首页</self-menu-item>
        <self-menu-item name="about">关于</self-menu-item>
        <self-menu-item name="contact">联系方式</self-menu-item>
      </self-menu>
    </div>
  </div>
</template>
<script>
  import SelfMenu from './menu/menu';
  import SelfSubMenu from './menu/subMenu';
  import SelfMenuItem from './menu/menuItem';

  export default {
    name: 'App',
    components: { SelfMenu, SelfMenuItem, SelfSubMenu },
    data () {
      return {
        select: 'home'
      };
    },
    mounted () {
    },
    methods: {

    }
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
  }
</style>
