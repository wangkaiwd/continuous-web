<template>
  <!--
    ui分析：通过点击一个元素，然后在元素下边弹出选择框
    要将2个元素放到一个父元素里，方便位置的控制以及插槽的使用
   -->
  <div class="self-cascader">
    <div class="self-cascader-trigger">
      <slot></slot>
    </div>
    <div class="self-cascader-popover"></div>
  </div>
</template>
<script>

  export default {
    name: 'SelfCascader',
    components: {},
    data () {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import '../var';

  .self-cascader {
    position: relative;
  }
</style>
