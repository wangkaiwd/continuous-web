<template>
  <div
    class="self-menu-item"
    :class="{selected}"
    @click="onClick"
    :style="{paddingLeft:`${paddingLeft}px`}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SelfMenuItem',
    inject: ['rootMenu'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      selected () {
        return this.rootMenu.selected === this.name;
      },
    },
    mounted () {
      this.$parent.addItem && this.$parent.addItem(this);
      this.getPaddingLeft();
    },
    methods: {
      onClick () {
        this.rootMenu.updateSelected(this);
      },
      getPaddingLeft () {
        if (!this.rootMenu.vertical) return;
        let parent = this.$parent;
        while (parent && parent.$options.name === 'SelfSubMenu') {
          parent = parent.$parent;
          this.paddingLeft = this.paddingLeft + 20;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../var";
  .self-menu-item {
    /*display: inline-block;*/
    padding: 1em 20px 1em 0;
    cursor: pointer;
    &:hover {
      color: $blue;
    }
    &.selected {
      background-color: red;
    }
  }
</style>
