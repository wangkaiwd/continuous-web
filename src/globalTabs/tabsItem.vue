<template>
  <div class="tabs-item" :class="{active}" @click="$emit('click',name)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GlobalTabsItem',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String | Number,
        required: true
      }
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
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .tabs-item {
    padding: 0 1em;
    height: 32px;
    display: flex;
    align-items: center;
    &.active {background-color: red;color: #fff;}
  }
</style>