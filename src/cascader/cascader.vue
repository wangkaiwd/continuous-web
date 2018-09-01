<template>
  <div class="cascader">
    <div class="trigger" @click="visible=!visible">
      <!--<slot></slot>-->

    </div>
    <!--<div class="popover" v-if="visible">-->
    <!--<div class="level1" v-for="(item,index) in options" :key="index">-->
    <!--{{item.name}}-->
    <!--<div class="level2">-->
    <!--<div v-for="(subItem,index) in item.children" :key="index">-->
    <!--{{subItem.name}}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <cascader-child :optionsItem="options" v-if="visible"></cascader-child>

  </div>
</template>

<script>
  import CascaderChild from './cascaderChild'

  export default {
    name: 'GlobalCascader',
    components: {
      CascaderChild
    },
    props: {
      options: {
        type: Array
      }
    },
    data () {
      return {
        visible: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';

  .cascader {
    .trigger {
      width: 100px;
      height: $button-height;
      border: 1px solid red;
    }
    .popover {
      /*width: 80px;*/
      height: 200px;
      border: 1px solid red;
    }
    .level1 {
      position: relative;
      /*width: 80px;*/
    }
    .level2 {
      position: absolute;
      top: 0;
      left: 100%;
      width: 80px;
      border: 1px solid blue;
    }
  }
</style>