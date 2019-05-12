<template>
  <div
    class="self-sub-menu"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      class="self-sub-menu-title"
      :class="{selected}"
    >
      <slot name="title"></slot>
    </div>
    <!--  这里碰到一个问题：如果使用v-if的话，并没有办法设置初始选中项，
          虽然我们已经设置了，但是由于页面中并没有该元素，所以我们根本获取不到dom
          这里我们使用v-show来解决这个问题
      -->
    <div class="self-sub-menu-popover" v-show="open">
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
    computed: {
      selected () {
        return this.items.some(item => item.selected);
      }
    },
    data () {
      return {
        open: false,
        items: [],
        timerId: null
      };
    },
    mounted () {
    },
    methods: {
      onClick () {
      },
      // 获取到所有的子组件，只要有子组件被选中，那么对应的subMenu也应该被选中
      addItem (item) {
        this.items.push(item);
      },
      onMouseEnter () {
        if (this.timerId) {clearTimeout(this.timerId);}
        this.open = true;
      },
      onMouseLeave () {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.open = false;
        }, 200);
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../var";
  .self-sub-menu {
    position: relative;
    &-title {
      padding: 1em 2em;
      cursor: pointer;
      &.selected {
        background-color: red;
      }
      &:hover {
        color: $blue;
      }
    }
    &-popover {
      margin-top: 4px;
      border: 1px solid blue;
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      word-break: break-all;
    }
    /*多级菜单的样式*/
    .self-sub-menu {
      .self-sub-menu-popover {
        margin-left: 4px;
        top: 0;
        left: 100%;
      }
    }
  }
</style>
