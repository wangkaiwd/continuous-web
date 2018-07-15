<template>
  <div class="global-row">
    <slot :gutter="gutter"></slot>
  </div>
</template>
<script>
  export default {
    name: 'GlobalRow',
    props: {
      gutter: {
        type: [String, Number]
      }
    },
    created () {
    },
    mounted () {
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }

  // var div = document.createElement('div') // div  父组件：created
  // var childDiv = document.createElement('div') // child div  子组件：created
  // div.appendChild(childDiv) // 子组件：mounted
  // body.appendChild(div) // 父组件： mounted
</script>
<style lang="scss" scoped>
  .global-row {display: flex;}
</style>
