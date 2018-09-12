<template>
  <div class="cascader-child">
    <div class="left">
      <p v-for="(item,index) in optionsItem"
         :key="index"
         @click="selected=item">
        {{item.name}}
        <g-icon v-if="item.children" class="right-icon" name="right-thin"></g-icon>
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
  @import '../var';

  .cascader-child {
    display: inline-flex;
    position: absolute;
    top: 100%;
    left: 0;
    height: 200px;
    background-color: #fff;
    @extend .box-shadow;
    .left {
      padding: .3em 0;
      &:not(:last-child) {
        border-right: 1px solid $border-color-light;
      }
      p {
        padding: .3em 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        &:hover {
          background-color: red;
        }
      }
    }
    .right-icon {
      margin-left: 1em;
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
    .cascader-child {
      position: relative;
      top: 0;
      box-shadow: none;
    }
  }
</style>