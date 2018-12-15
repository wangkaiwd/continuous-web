<template>
  <div class="slide">
    <div class="slide-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GSlide',
    props: {
      select: {
        type: String,
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.updateChild()
    },
    methods: {
      updateChild () {
        const child = this.$children
        const select = this.select || child[0].name
        child.map(vm => vm.select = this.select)
      }
    },
    // 由于数据更改导致的虚拟dom重新渲染和打补丁，在这之后会调用该钩子
    // 当这个钩字被调用时，组件dom已经更新，所以你先可以执行依赖于DOM的操作
    // 注意：在组件首次加载的时候，这个钩子函数并不会执行
    updated () {
      this.updateChild()
    }
  }
</script>

<style lang="scss" scoped>
  .slide {
    display: inline-block;
    &-window {
      display: flex;
    }
  }
</style>