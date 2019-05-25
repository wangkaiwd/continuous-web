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
    <div class="self-cascader-trigger-wrapper" @click="onClickTrigger">
      <slot>
        <div class="self-cascader-trigger">
          {{selectedLabels}}
        </div>
      </slot>
    </div>
    <div class="self-cascader-popover" v-if="visible">
      <!--   这里需要留意：vue的属性不能以data-开头   -->
      <self-cascader-item
        :options="options"
        :selected.sync="selected"
        :level.sync="level"
      >
      </self-cascader-item>
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
        selected: [],
        level: 0
      };
    },
    computed: {
      selectedLabels () {
        const { selected } = this;
        return selected.map(item => item.label).join('/');
      }
    },
    methods: {
      onClickTrigger () {
        this.visible = !this.visible;
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import '../var';

  .self-cascader {
    position: relative;
    &-trigger {
      display: inline-flex;
      align-items: center;
      padding: .3em .5em;
      min-width: 10em;
      height: 32px;
      border: 1px solid black;
    }
    &-popover {
      margin-top: 8px;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid red;
      height: 200px;
    }
  }
</style>
