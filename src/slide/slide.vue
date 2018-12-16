<template>
  <div class="slide">
    <div
      class="slide-window"
      @mouseover="pause"
      @mouseleave="playAutomatically"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @touchmove="onTouchMove"
    >
      <slot></slot>
      <div class="controls">
        <ul>
          <!--注意：当v-for遍历一个数字的时候，这里的n是从1开始，所以在取名的时候不要用index-->
          <li
            v-for="index in names.length"
            :key="index"
            :class="controlActive(index)"
            @click="switchSlide(index)"
          >
            {{index}}
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
        lastSelect: '',
        timerId: null,
        startX: null,
        startY: null
      }
    },
    computed: {
      selectIndex () {
        if (this.names) {
          return this.names.indexOf(this.select)
        }
        return 0
      }
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
          const newIndex = this.selectIndex
          const oldIndex = names.indexOf(this.lastSelect)
          // 还有一个反向动画：在更新reverse时，并没有在挂载在dom上之后再进行动画
          // 而进行动画的时间是从visible进行切换的时候开始的
          vm.reverse = newIndex < oldIndex
          // 分析：3-1:无缝应该是正向
          //      0-3:无缝应该是反向

          // 通过timerId来进行区分是用户手动点击还是组件自动轮播
          // 如果是轮播状态： 3-1是正向
          // 如果是用户手动点击：3-1是反向
          // 而当用户点击的时候，就一定会触发onmouseover事件

          // 这里其实是有3个状态：1. 点击下方小点 2. 自动轮播 3. 移动端滑屏
          if (this.timerId) {
            if (newIndex === 0 && oldIndex === names.length - 1) {vm.reverse = false}
            if (newIndex === names.length - 1 && oldIndex === 0) {vm.reverse = true}
          }
          // 确保reverse在更新到DOM上之后再进行动画
          this.$nextTick(() => vm.select = select)
        })
      },
      playAutomatically () {
        // 如果有timerId的话，不执行动画(防止动画的重复执行)
        // 会重复执行的情况：当你的鼠标一直停在轮播图上的时候进行页面刷新，那在鼠标移除的时候就会立即执行这个函数
        if (this.timerId) return
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
          // 每次都会动态更新select,根据select来获取当前的index,然后进行++或--
          let index = this.selectIndex
          index++
          this.updatedSelect(index)
          this.timerId = setTimeout(run, 1500)
        }
        this.timerId = setTimeout(run, 1500)
      },
      // 通过方法来简化模板
      controlActive (n) {
        const active = n - 1 === this.selectIndex
        return {active}
      },
      switchSlide (n) {
        this.updatedSelect(n - 1)
      },
      updatedSelect (index) {
        if (index === -1) {index = this.names.length - 1}
        if (index === this.names.length) {index = 0}
        this.lastSelect = this.select
        this.$emit('update:select', this.names[index])
      },
      pause () {
        clearTimeout(this.timerId)
        this.timerId = null
      },
      onTouchStart (e) {
        // client:触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
        this.pause()
      },
      onTouchEnd (e) {
        // 如果是多个手指的话不进行处理
        if (e.changedTouches.length > 1) {return}
        const {clientX: x2, clientY: y2} = e.changedTouches[0]
        const distanceY = Math.pow(y2 - this.startY, 2)
        const distanceX = Math.pow(x2 - this.startX, 2)
        const distance = Math.sqrt(distanceX + distanceY)
        const rate = Math.abs(y2 - this.startY) / distance
        if (rate < 1 / 2) {
          if (x2 > this.startX) {this.updatedSelect(this.selectIndex - 1)}
          if (x2 < this.startX) {this.updatedSelect(this.selectIndex + 1)}
        }
        this.playAutomatically()
      },
      onTouchMove (e) {
        // console.log('move', e)
      }
    },
    // 由于数据更改导致的虚拟dom重新渲染和打补丁，在这之后会调用该钩子
    // 当这个钩字被调用时，组件dom已经更新，所以你先可以执行依赖于DOM的操作
    // 注意：在组件首次加载的时候，这个钩子函数并不会执行
    updated () {
      this.updateChild()
    },
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
      bottom: 1em;
      ul {display: flex;}
      li {
        display: flex;align-items: center;justify-content: center;
        width: 1.2em;height: 1.2em;margin: 0 0.5em; border-radius: 50%;
        font-size: 12px;
        &:hover {
          cursor: pointer;
        }
      }
      .active {
        background-color: red;
        color: #fff;
        &:hover {
          cursor: default;
        }
      }
    }
  }
</style>