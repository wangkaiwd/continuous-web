<template>
  <div class="self-sub-menu">
    <div class="self-sub-menu-title" @click="onClick">
      <slot name="title"></slot>
    </div>
    <!--  这里碰到一个问题：如果使用v-if的话，并没有办法设置初始选中项，
          虽然我们已经设置了，但是由于页面中并没有该元素，所以我们根本获取不到dom
          这里我们使用v-show来解决这个问题
      -->
    <div class="self-sub-menu-popover" v-show="selected">
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
        selected: false
      };
    },
    watch: {
      'rootMenu.selected': {
        handler () {
          this.selected = this.getSelect();
        }
      }
    },
    mounted () {
      this.selected = this.getSelect();
    },
    methods: {
      onClick () {
        this.rootMenu.updateSelected(this, this.getSelect());
      },
      getSelect () {
        const { selected } = this.rootMenu;
        const isSelectChild = this.$children
          .filter(vm => vm.$options.name === 'SelfMenuItem')
          .some(vm => vm.name === selected);
        const isSelectCurrent = selected === this.name;
        return isSelectCurrent || isSelectChild;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .self-sub-menu {
    position: relative;
    &-title {
      padding: 1em 2em;
    }
    &-popover {
      border: 1px solid blue;
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      word-break: break-all;
    }
  }
</style>
