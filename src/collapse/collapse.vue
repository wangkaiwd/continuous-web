<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  // 实现只让一个内容开合，其它的兄弟都要关闭
  // 1. eventBus
  // 2.
  import Vue from 'vue'

  export default {
    name: 'GlobalCollapse',
    props: {
      single: {
        type: Boolean,
        default: false
      },
      selected: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        eventBus: new Vue,
      }
    },
    // 确保所有子元素都加载完成
    mounted () {
      // let index, bool = true
      // console.log(this.$children)
      // this.$children.forEach((vm, i) => {
      //   if (vm.active === true && bool) {
      //     index = i
      //     bool = false
      //   }
      //   if (index !== i) {
      //     vm.active = false
      //   }
      // })

    },
    provide () {
      return {
        eventBus: this.eventBus
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: #ddd;
  $border-radius: 4px;
  .collapse {
    border: 1px solid $border-color;
    border-radius: $border-radius;
  }
</style>