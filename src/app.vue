<template>
  <div>
    <div class="component-wrapper">
      <!--
          defaultSelected: []（可以同时展开多个subMenu,所以要用数组来表示，而menuItem只能同时选中一个）
          1. 首先完成最简单的1级菜单
          2. 然后完成对应的二级菜单
          3. 最后完成层级的递归
          -->
      <!--
          这里关于sub-menu对应的标题文字api设计：
           1. 通过title属性传入
           2. 通过slot插槽进行设置

          这里选择2，因为大多数情况下，我们都会在文字之前添加一些图标，而vue中要在属性中加入标签的话需要render函数
          这里为了方便书写，所以直接使用slot来传入
      -->
      <self-menu :selected.sync="select">
        <self-menu-item name="home">首页</self-menu-item>
        <self-sub-menu name="about">
          <template #title>
            关于
          </template>
          <self-menu-item name="about1">关于1</self-menu-item>
          <self-menu-item name="about2">关于2</self-menu-item>
          <self-menu-item name="about3">关于3</self-menu-item>
          <self-sub-menu name="personal">
            <template #title>个人</template>
            <self-menu-item name="personal1">个人1</self-menu-item>
            <self-menu-item name="personal2">个人2</self-menu-item>
            <self-menu-item name="personal3">个人3</self-menu-item>
          </self-sub-menu>
        </self-sub-menu>
        <self-menu-item name="contact">联系方式</self-menu-item>
      </self-menu>
      {{select}}
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
        select: 'about1'
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
