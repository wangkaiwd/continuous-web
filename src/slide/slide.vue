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
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.getNames()
      this.updateChild()
      if (this.autoPlay) {
        this.playAutomatically()
      }
    },
    methods: {
      // 代码优化技巧：由于这俩行代码在比较多的地方用到，可以通过一个方法来进行处理
      getSelect () {
        const child = this.$children
        return this.select || child[0].name
      },
      getNames () {
        this.names = this.$children.map(vm => vm.name)
      },
      updateChild () {
        const {names} = this
        const select = this.getSelect()
        this.$children.map(vm => {
          const newIndex = names.indexOf(vm.name)
          const oldIndex = names.indexOf(this.getSelect())
          vm.select = select
          vm.reverse = newIndex < oldIndex
        })
      },
      playAutomatically () {
        const {names} = this
        let index = names.indexOf(this.getSelect())
        // setInterval(() => {
        //   index++
        //   if (index > names.length - 1) {
        //     index = 0
        //   }
        //   // 这里应该更新父组件的select
        //   this.$emit('update:select', names[index])
        //   // 不更新父组件的select，可能会出现问题，而这种简写在react中并不支持
        //   // this.$children.map(vm => vm.select = names[index])
        // }, 1000)

        // 使用setTimeout来模拟setInterval
        // 原因：使用setInterval如果忘记clear的话，会导致内存不断扩大
        //      setTimeout: 可以自动停止
        const run = () => {
          index++
          if (index > names.length - 1) {index = 0}
          // index--
          // if (index < 0) { index = names.length - 1}
          // 当select不传递的时候，这段代码并不会执行
          this.$emit('update:select', names[index])
          setTimeout(run, 1000)
        }
        setTimeout(run, 1000)
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
    margin-top: 40px;
    display: inline-block;
    width: 100%;
    &-window {
      position: relative;
      overflow: hidden;
      display: flex;
      width: 100%;
    }
  }
</style>