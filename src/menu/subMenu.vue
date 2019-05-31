<template>
  <div
    class="self-sub-menu"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :class="{vertical}"
  >
    <div
      class="self-sub-menu-title"
      :class="{selected}"
      @click="onClick"
      :style="{paddingLeft:`${paddingLeft}px`}"
    >
      <slot name="title"></slot>
      <span>{{open?'-':'+'}}</span>
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
        if (this.vertical) {
          return false;
        }
        return this.items.some(item => item.selected);
      },
      vertical () {
        return this.rootMenu.vertical;
      }
    },
    data () {
      return {
        open: false,
        items: [],
        timerId: null,
        paddingLeft: 20
      };
    },
    mounted () {
      // 当被选中的组件为subMenu组件时，对应的所有父subMenu组件也应该被选中
      this.$parent.addItem && this.$parent.addItem(this);
      this.getPaddingLeft();
    },
    methods: {
      onClick () {
        if (!this.vertical) return;
        this.open = !this.open;
      },
      // 获取到所有的子组件，只要有子组件被选中，那么对应的subMenu也应该被选中
      addItem (item) {
        this.items.push(item);
      },
      onMouseEnter () {
        if (this.vertical) return;
        if (this.timerId) {clearTimeout(this.timerId);}
        this.open = true;
      },
      onMouseLeave () {
        if (this.vertical) return;
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.open = false;
        }, 200);
      },
      getPaddingLeft () {
        if (!this.rootMenu.vertical) return;
        let parent = this.$parent;
        while (parent && parent.$options.name === 'SelfSubMenu') {
          parent = parent.$parent;
          this.paddingLeft = this.paddingLeft + 20;
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../var";
  .self-sub-menu {
    display: inline-block;
    position: relative;
    &-title {
      padding: 1em 20px 1em 0;
      cursor: pointer;
      &.selected {
        background-color: red;
      }
      &:hover {
        color: $blue;
      }
    }
    &-popover {
      background-color: #fff;
      margin-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid blue;
      white-space: nowrap;
      word-break: break-all;
      z-index: 1;
      .self-sub-menu {
        display: block;
      }
      .self-menu-item {
        display: block;
      }
      .self-sub-menu-popover {
        margin-top: 0;
      }
    }
    &.vertical &-popover {
      position: static;
      margin-top: 0;
      border: none;
      z-index: auto;
      .self-sub-menu {
        display: block;
      }
      .self-sub-menu-title {
        /*padding-left: 4px;*/
      }
      .self-menu-item {
        /*padding-left: 4px;*/
        display: block;
      }
    }
    /*多级菜单的样式*/
    .self-sub-menu {
      .self-sub-menu-popover {
        margin-left: 4px;
        top: 0;
        left: 100%;
      }
    }
    .self-sub-menu.vertical {
      .self-sub-menu-popover {
        margin-left: 0;
      }
    }
  }
</style>
