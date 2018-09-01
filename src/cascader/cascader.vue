<template>
  <div class="cascader">
    <div class="trigger" @click="visible=!visible">
      <!--<slot></slot>-->

    </div>
    <div class="popover" v-if="visible">
      <div class="level1">
        <p @click="activeIndex=index" v-for="(item,index) in options" :key="index">
          {{item.name}}
        </p>
      </div>
      <div class="level2" v-if="options[activeIndex].children">
        <p v-for="(subItem,index) in options[activeIndex].children"
           :key="index"
           @click="activeIndex2=index">
          {{subItem.name}}
        </p>
      </div>
      <div class="level3" v-if="options[activeIndex].children && options[activeIndex].children[activeIndex2].children">
        <p v-for="(subItem2,index) in options[activeIndex].children[activeIndex2].children" :key="index">
          {{subItem2.name}}
        </p>
      </div>
    </div>
    <!--<cascader-child :optionsItem="options" v-if="visible"></cascader-child>-->

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
        visible: false,
        activeIndex: 0,
        activeIndex2: 0,
      }
    },
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
      display: inline-flex;
      height: 200px;
      border: 1px solid red;
    }
    .level1 {
      position: relative;
      width: 80px;
    }
    .level2 {
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 100%;*/
      width: 80px;
      border: 1px solid blue;
    }
    .level3 {
      width: 80px;
      border: 1px solid pink;
    }
    p {
      cursor: pointer;
    }
  }
</style>