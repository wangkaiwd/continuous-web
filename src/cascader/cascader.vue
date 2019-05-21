<template>
  <!--
    ui分析：通过点击一个元素，然后在元素下边弹出选择框
    要将2个元素放到一个父元素里，方便位置的控制以及插槽的使用
   -->
  <div class="self-cascader">
    <div class="self-cascader-trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
    <div class="self-cascader-popover" v-if="visible">
      <!--   这里需要留意：vue的属性不能以data-开头   -->
      <self-cascader-item :options="options"></self-cascader-item>
    </div>
  </div>
</template>
<script>
  import SelfCascaderItem from './cascaderItem';

  export default {
    name: 'SelfCascader',
    components: { SelfCascaderItem },
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        visible: false
      };
    },
    methods: {
      onClickTrigger () {
        this.visible = !this.visible;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../var';

  .self-cascader {
    position: relative;
    &-popover {
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
</style>
