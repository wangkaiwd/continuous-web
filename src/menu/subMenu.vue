<template>
  <div class="self-sub-menu">
    <div class="self-sub-menu-title">
      <slot name="title"></slot>
    </div>
    <!--  这里碰到一个问题：如果使用v-if的话，并没有办法设置初始选中项，
          虽然我们已经设置了，但是由于页面中并没有该元素，所以我们根本获取不到dom
          这里我们使用v-show来解决这个问题
      -->
    <div class="self-sub-menu-popover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 这个组件的难点：
   *  1. 递归组件之间如何通信
   *  2. 递归组件的css如何书写
   *  3. 如何可以优雅的将水平和竖直方向的情况通过一个组件来处理好
   */
  export default {
    name: 'SelfSubMenu',
    inject: ['rootMenu'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false
      };
    },
    mounted () {
    },
    methods: {
      onClick () {
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../var";
  .self-sub-menu {
    position: relative;
    &:hover {
      color: $blue;
      .self-sub-menu-popover {
        display: inline-block;
        vertical-align: top;
      }
    }
    &-title {
      padding: 1em 2em;
      cursor: pointer;
    }
    &-popover {
      display: none;
      border: 1px solid blue;
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      word-break: break-all;
    }
  }
</style>
