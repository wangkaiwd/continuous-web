<template>
  <div class="menu-item" :class="{selected}" @click="onClick">
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
    computed: {
      selected () {
        return this.rootMenu.selected === this.name;
      }
    },
    mounted () {
      this.$parent.addItem && this.$parent.addItem(this);
    },
    methods: {
      onClick () {
        this.rootMenu.updateSelected(this);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../var";
  .menu-item {
    padding: 1em 2em;
    cursor: pointer;
    &:hover {
      color: $blue;
    }
    &.selected {
      background-color: red;
    }
  }
</style>
