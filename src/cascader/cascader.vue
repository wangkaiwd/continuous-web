<template>
  <div class="cascader">
    <div class="trigger" @click="visible=!visible">
      <!--<slot></slot>-->

    </div>
    <div class="popover" v-if="visible">
      <div class="level1">
        <p @click="selected1=item1" v-for="(item1,index) in options" :key="index">
          {{item1.name}}
        </p>
      </div>
      <div class="level2" v-if="level2Selected">
        <p v-for="(item2,index) in level2Selected"
           :key="index"
           @click="selected2=item2">
          {{item2.name}}
        </p>
      </div>
      <div class="level3" v-if="level3Selected">
        <p v-for="(item3,index) in level3Selected" :key="index">
          {{item3.name}}
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
        selected1: {},
        selected2: {},
      }
    },
    computed: {
      level2Selected () {
        if (this.selected1.children) {
          return this.selected1.children
        } else {
          return null
        }
      },
      level3Selected () {
        if (this.selected2.children) {
          return this.selected2.children
        } else {
          return null
        }
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