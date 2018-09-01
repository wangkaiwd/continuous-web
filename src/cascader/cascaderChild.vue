<template>
  <div class="cascader-child">
    <div class="popover2" v-for="(item,index) in optionsItem" :key="index">
      {{item.name}}
      <template v-if="item.children">
        <cascader-child :optionsItem="item.children"></cascader-child>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CascaderChild',
    props: {
      optionsItem: {
        type: Array,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cascader-child {
    position: relative;
    width: 80px;
    /*width: 100px;*/
    border: 1px solid red;
    .cascader-child {
      position: absolute;
      top: 0;
      left: 100%;
      width: 80px;
      border: 1px solid blue;
      display: none;
    }
    .popover2:hover .cascader-child {
      display: block;
    }
  }
</style>