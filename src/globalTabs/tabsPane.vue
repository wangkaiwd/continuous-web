<template>
  <div class="tabs-pane" v-if="active" :class="{active}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GlobalTabsPane',
    props: {
      name: String | Number,
      required: true
    },
    inject: ['eventBus'],
    data () {
      return {
        active: false
      }
    },
    mounted () {
      this.eventBus.$on('updated:selected', (name) => {
        this.active = name === this.name
      })
    }
  }
</script>

<style lang="less" scoped>
  .tabs-pane {
    padding: 1.5em 1.5em;
    min-height: 100px;;
    &.active {background-color: pink;color: #fff;}
  }
</style>