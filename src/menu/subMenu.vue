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
    <transition>
      <div class="self-sub-menu-popover" v-show="open">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  /**
   * 这个组件的难点：
   *  1. 递归组件之间如何通信
   *  2. 递归组件的css如何书写
   *  3. 如何可以优雅的将水平和竖直方向的情况通过一个组件来处理好
   *
   * 目前遇到的问题：
   *  1. 如何实现侧边栏展开时的动画，由于在之后的菜单中可能继续有subMenu，在其展开后，subMenu的popover的高度又会发生变化，这时该如何处理
   *  2. 当菜单为横向时，如何在点击一项后将所有的subMenu都设置为闭合状态，并让其对应的父元素选中
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
        paddingLeft: 20,
        popoverHeight: 0
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
      },
      // beforeEnter (el) {
      //
      // },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      // enter (el, done) {
      //   console.log('enter');
      //   const oldHeight = el.offsetHeight;
      //   el.style.height = 0;
      //   el.offsetHeight;
      //   el.style.transition = `height 1s`;
      //   el.style.height = `${oldHeight}px`;
      //   done();
      // },
      // afterEnter (el) {
      //   // el.style = '';
      // },
      // leave (el, done) {
      //   el.style.height = 0;
      //   done();
      // },
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
      }
      .self-menu-item {
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
