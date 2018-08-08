<template>
  <div class="popover">
    <div class="content-wrapper" v-show="visible">
      <slot name="content"></slot>
    </div>
    <div class="button-wrapper" @click="xxx">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popover',
    data () {
      return {visible: false}
    },
    methods: {
      xxx () {
        this.visible = !this.visible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popover {
    position: relative;
    display: inline-block;
    vertical-align: top;
    .content-wrapper {
      position: absolute;
      bottom: 100%;
      left: 0;
      border: 1px solid red;
      box-shadow: 0 0 3px rgba(0, 0, 0, .5);
    }
  }
</style>