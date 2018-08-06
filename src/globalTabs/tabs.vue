<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'globalTabs',
    props: {
      selected: {
        type: String | Number,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator (val) {
          return ['horizontal', 'vertical'].indexOf(val) > -1
        }
      }
    },
    data () {
      return {
        eventBus: new Vue()
      }
    },
    // 公共的父组件提供eventBus之后，所有的子组件都可以通过inject引入之后进行访问
    provide () {
      return {
        eventBus: this.eventBus
      }
    },
    mounted () {
      this.$emit('updated:selected', this.selected)
      this.eventBus.$emit('updated:selected', this.selected, this)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    width: 400px;
  }
</style>