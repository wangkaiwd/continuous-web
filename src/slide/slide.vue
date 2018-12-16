<template>
  <div class="slide">
    <div class="slide-window">
      <slot></slot>
      <div class="controls">
        <ul>
          <!--注意：当v-for遍历一个数字的时候，这里的n是从1开始，所以在取名的时候不要用index-->
          <li
            v-for="n in names.length"
            :key="n"
            :class="controlActive(n)"
            @click="switchSlide(n)"
          >
            {{n}}
          </li>
        </ul>
      </div>
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
      return {
        names: [],
        lastSelect: ''
      }
    },
    computed: {},
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
          const newIndex = names.indexOf(this.getSelect())
          const oldIndex = names.indexOf(this.lastSelect)
          // 还有一个反向动画：在更新reverse时，并没有在挂载在dom上之后再进行动画
          // 而进行动画的时间是从visible进行切换的时候开始的
          vm.reverse = newIndex < oldIndex
          // 确保reverse在更新到DOM上之后再进行动画
          this.$nextTick(() => vm.select = select)
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
          this.updatedSelect(index)
          setTimeout(run, 1000)
        }
        setTimeout(run, 1000)
      },
      // 通过方法来简化模板
      controlActive (n) {
        const active = n - 1 === this.names.indexOf(this.getSelect())
        return {active}
      },
      switchSlide (n) {
        if (n === 0) {
          n = this.names.length
        }
        if (n === this.names.length + 1) {
          n = 1
        }
        this.updatedSelect(n - 1)
      },
      updatedSelect (index) {
        this.lastSelect = this.select
        this.$emit('update:select', this.names[index])
      },
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
    width: 100%;
    &-window {
      position: relative;
      overflow: hidden;
      display: flex;
      width: 100%;
    }
    .controls {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      ul {display: flex;}
      li {padding: 0 4px;cursor: pointer;}
      .active {background-color: pink;}
    }
  }
</style>