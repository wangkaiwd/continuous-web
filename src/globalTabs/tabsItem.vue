<template>
  <div class="tabs-item" :class="tabsItemClasses" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GlobalTabsItem',
    props: {
      disabled: {type: Boolean, default: false},
      name: {type: String | Number, required: true}
    },
    computed: {
      tabsItemClasses () {
        const {active, disabled} = this
        return {active, disabled}
      }
    },
    inject: ['eventBus'],
    data () {
      return {active: false}
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
        if (this.disabled) {
          return
        }
        this.eventBus.$emit('updated:selected', this.name, this)
      },
    }
  }
</script>

<style lang="scss" scoped>
  $blue: #1890ff;
  .tabs-item {
    position: relative;padding: 0 8px;height: 32px;
    display: flex;color: rgba(0, 0, 0, 0.65);
    margin-right: 1em;align-items: center;cursor: pointer;
    &.active {font-weight: bold;color: $blue;}
    &.disabled {cursor: not-allowed;color: rgba(0, 0, 0, 0.25);}
    > .icon {margin-right: 4px;}
  }
</style>