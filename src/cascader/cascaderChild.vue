<template>
  <div class="cascader-child">
    <div class="left">
      <p v-for="(item,index) in optionsItem"
         :key="index"
         @click="selected=item">
        {{item.name}}
      </p>
    </div>
    <div class="right" v-if="rightItem">
      <cascader-child :optionsItem="rightItem"></cascader-child>
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
    },
    data () {
      return {
        selected: {}
      }
    },
    computed: {
      rightItem () {
        if (this.selected.children) {
          return this.selected.children
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cascader-child {
    position: absolute;
    /*top: 100%;*/
    top: 100%;
    left: 0;
    border: 4px solid red;
    display: inline-flex;
    height: 200px;
    .left {width: 80px;}
    .cascader-child {
      border: 1px solid blue;
    }
  }
</style>