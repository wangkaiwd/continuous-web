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
    border: 2px solid red;
    display: inline-flex;
    position: absolute;
    top: 100%;
    left: 0;
    height: 200px;
    background-color: #fff;
    .left {width: 80px;}
    .cascader-child {
      position: relative;
      top: 0;
      border: 1px solid blue;
    }
  }
</style>