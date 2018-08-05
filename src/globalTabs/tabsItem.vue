<template>
  <div class="tabs-item" :class="{active}" @click="onClick">
    <slot></slot>
    <div class="line" ref="line" v-if="active"></div>
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
        // this.moveLine()
      })
    },
    methods: {
      onClick () {
        /**
         * 1. 这里的自定义事件只不过是和tabs中的自定义事件重名了而已
         * 2. 由于代码逻辑都一样，所以自定义一个同名函数进行逻辑书写
         */
        this.eventBus.$emit('updated:selected', this.name)
      },
      // moveLine () {
      //   const tabsItem = document.getElementsByClassName('active')[0]
      //   const line = this.$refs.line
      //   if (this.active) {
      //     line.style.width = tabsItem.clientWidth + 'px'
      //   }
      //   else {
      //     line.style.width = '0px'
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  $blue: blue;
  .tabs-item {
    @keyframes lineMove {
      0% {width: 0;}
      100% {width: 100%;}
    }
    position: relative;
    padding: 0 1em;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &.active {font-weight: bold;color: $blue;}
    > .line {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      background-color: $blue;
      animation: lineMove 1s;
    }
  }
</style>