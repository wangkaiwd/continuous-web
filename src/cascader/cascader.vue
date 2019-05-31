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
    <div class="self-cascader-trigger-wrapper" ref="triggerWrapper" @click="onClickTrigger">
      <slot>
        <div class="self-cascader-trigger">
          {{selectedLabels}}
        </div>
      </slot>
    </div>
    <div class="self-cascader-popover" ref="popover" v-if="visible">
      <!--   这里需要留意：vue的属性不能以data-开头   -->
      <self-cascader-item
        :options="options"
        :selected="selected"
        :level.sync="level"
        :load-data="loadData"
        :loading-item="loadingItem"
        @update:selected="updateSelected"
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
      },
      selected: {
        type: Array,
        required: true
      },
      loadData: { type: Function }
    },
    data () {
      return {
        visible: false,
        level: 0,
        loadingItem: {}
      };
    },
    computed: {
      selectedLabels () {
        const { selected } = this;
        return selected.map(item => item.label).join('/');
      },
    },
    methods: {
      onClickTrigger () {
        this.visible = !this.visible;
        if (this.visible) {
          setTimeout(() => {
            document.addEventListener('click', this.listenToDocument);
          }, 20);
        }
      },
      listenToDocument (e) {
        const { triggerWrapper, popover } = this.$refs;
        const isContainTrigger = triggerWrapper.contains(e.target);
        const isContainPopover = popover.contains(e.target);
        if (isContainTrigger || isContainPopover) {return;}
        this.visible = false;
        document.removeEventListener('click', this.listenToDocument);
      },
      updateSelected (newSelected) {
        this.$emit('update:selected', newSelected);
        const finalSelected = newSelected[newSelected.length - 1];
        if (finalSelected.isLeaf) {return;}
        if (this.loadData) {
          this.loadingItem = finalSelected;
          this.loadData(this.updateOptions);
        }
      },
      updateOptions (result) {
        this.loadingItem = {};
        const optionsCopy = JSON.parse(JSON.stringify(this.options));
        const iterate = (options, result) => {
          return options.map(option => {
            if (option.value === result.value) {
              result.children && (option.children = result.children);
            } else {
              if (option.children) {
                iterate(option.children, result);
              }
            }
            return option;
          });
        };
        iterate(optionsCopy, result);
        this.$emit('update:options', optionsCopy);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../var';

  .self-cascader {
    position: relative;
    display: inline-block;
    vertical-align: top;
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
