<template>
  <div class="tabs-item" :class="{active}" @click="onClick">
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
    methods: {
      onClick () {
        /**
         * 1. 这里的自定义事件只不过是和tabs中的自定义事件重名了而已
         * 2. 由于代码逻辑都一样，所以自定义一个同名函数进行逻辑书写
         */
        this.eventBus.$emit('updated:selected', this.name)
      }
    }
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