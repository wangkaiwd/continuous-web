<template>
  <div class="tabs-nav">
    <!--匿名插槽-->
    <slot></slot>
    <!--具名插槽-->
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
    <div class="line-wrapper">
      <div class="line" ref="line"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'globalTabsNav',
    inject: ['eventBus'],
    mounted () {
      this.eventBus.$on('updated:selected', (data, vm) => {
        let newVM
        console.log('vm', vm)
        if (vm.$options.name === 'globalTabs') {
          vm.$children[0].$children.forEach((item) => {
            if (item.name === vm.selected) {
              newVM = item
            }
          })
        }
        else {
          newVM = vm
        }
        // vm.$el:vue实例使用的根DOM元素
        const lineWrapper = document.getElementsByClassName('line-wrapper')[0]
        const tabItem = newVM.$el
        lineWrapper.style.width = tabItem.clientWidth + 'px'
        lineWrapper.style.left = tabItem.offsetLeft + 'px'
      })
    },
  }
</script>

<style lang="scss" scoped>
  $blue: blue;
  .tabs-nav {position: relative;display: flex;
    // 尽量用子元素选择器
    > .actions-wrapper {margin-left: auto;}
    > .line-wrapper {position: absolute;bottom: 0;height: 2px;
      /* 这里的宽度也是动态生成的，所以transition要设置all */
      /*动态生成的属性：1. width 2. left*/
      transition: all .4s;
    }
    .line {height: 100%;width: 70%;margin: 0 auto;
      background-color: $blue;
    }
  }
</style>