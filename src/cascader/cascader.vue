<template>
  <div class="cascader">
    <div class="trigger">
      <slot></slot>
    </div>
    <cascader-child :optionsItem="options"></cascader-child>
  </div>
</template>

<script>
  import CascaderChild from './cascaderChild'

  export default {
    name: 'GlobalCascader',
    props: {
      options: {
        type: Array
      }
    },
    components: {
      CascaderChild
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';

</style>