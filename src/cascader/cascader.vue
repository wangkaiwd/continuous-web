<template>
  <!--
    ui分析：通过点击一个元素，然后在元素下边弹出选择框
    要将2个元素放到一个父元素里，方便位置的控制以及插槽的使用
   -->
  <!--
    可以先通过写死的几层数据来进行数据的初步展示，之后再总结为递归
    接下来实现的效果：点击上一层出现下一层。
   -->
  <div class="self-cascader">
    <div class="self-cascader-trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
    <div class="self-cascader-popover" v-if="visible">
      <!--   这里需要留意：vue的属性不能以data-开头   -->
      <self-cascader-item :options="options"></self-cascader-item>
      <!--      <div class="level1">-->
      <!--        <div-->
      <!--          class="self-cascader-item"-->
      <!--          v-for="item in options"-->
      <!--          @click="onClickLevel1(item)"-->
      <!--          :key="item.value"-->
      <!--        >-->
      <!--          {{item.label}}-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="level2">-->
      <!--        <div-->
      <!--          class="self-cascader-item"-->
      <!--          v-for="item in level2Item"-->
      <!--          :key="item.value"-->
      <!--          @click="onClickLevel2(item)"-->
      <!--        >-->
      <!--          {{item.label}}-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="level3">-->
      <!--        <div class="self-cascader-item" v-for="item in level3Item" :key="item.value">-->
      <!--          {{item.label}}-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
  import SelfCascaderItem from './cascaderItem';

  export default {
    name: 'SelfCascader',
    components: { SelfCascaderItem },
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        visible: false,
        level2Item: [],
        level3Item: []
      };
    },
    methods: {
      onClickTrigger () {
        this.visible = !this.visible;
      },
      onClickLevel1 (item) {
        const level1Item = this.options.find(option => option.value === item.value);
        if (level1Item.children) {
          this.level2Item = level1Item.children;
        } else {
          this.level2Item = [];
        }
        this.level3Item = [];
      },
      onClickLevel2 (item) {
        const level2Item = this.level2Item.find(option => option.value === item.value);
        if (level2Item.children) {
          this.level3Item = level2Item.children;
        } else {
          this.level3Item = [];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../var';

  .self-cascader {
    position: relative;
    &-popover {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid red;
      height: 200px;
    }
  }
</style>
