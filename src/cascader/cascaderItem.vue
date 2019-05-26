<template>
  <div class="self-cascader-item">
    <!--  将所有的父级放到一起  -->
    <div class="self-cascader-item-left">
      <div
        v-for="option in options"
        class="self-cascader-item-list"
        @click="onClickLeft(option)"
        :key="option.value"
      >
        {{option.label}}
        <template v-if="loadingItem.value === option.value">
          <g-icon class="next-loading" name="loading"></g-icon>
        </template>
        <template v-else>
          <g-icon v-if="hasChildren(option)" class="next" name="s-right"></g-icon>
        </template>
      </div>
      <!--  将所有的子集放到这里  -->
    </div>

    <div class="self-cascader-item-right" v-if="rightItem">
      <!--  这样做的一个好处  -->
      <!--
        $event 2个用法：
          1. 绑定函数的时候可以传入事件对象
          2. 可以在行内接收子组件自定义函数传入的抛出的参数
      -->
      <self-cascader-item
        :options="rightItem"
        :level="level+1"
        :selected="selected"
        :load-data="loadData"
        :loading-item="loadingItem"
        @update:selected="$emit('update:selected',$event)"
      >
      </self-cascader-item>
    </div>
  </div>
</template>

<script>
  /**
   * 难点总结：
   *  1. 如何生成递归组件
   *  2. 如何为递归组件设置样式
   *  3. 如何在点击前一层时将后一层的内容清空
   * 难点3的解决方法：在组件递归时候，记录对应的层级，之后再数据更改的时候将之后层的内容进行清空
   * 单向数据流：每一层都通知上一层来更改传入的数据，直到将最顶层的数据进行修改。而当我们要进行修改的时候，只需要修改最顶层的数据即可
   *  关键点：
   *    递归组件每一个都维护一个自己的childItem很难进行一个总体的管理，
   *    这时我们可以通过父组件传入一个数据，每次都更改这一个数据来进行操作的简化
   *    而在上层数据更新之后，对应得下层组件也会随着数据的更新而更新对应的视图
   *
   * todo:
   *  1. 同时请求多个子项数据该怎么办？
   *  2. 如何进行数据缓存？（已经请求过的数据不再重新请求）
   */
  import GIcon from '../icon';

  export default {
    name: 'SelfCascaderItem',
    props: {
      options: {
        type: Array,
        default: () => []
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      },
      loadData: { type: Function },
      loadingItem: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {};
    },
    components: { GIcon },
    computed: {
      rightItem () {
        const { selected, level } = this;
        const value = selected[level] ? selected[level].value : '';
        const target = this.options.find(option => option.value === value);
        if (target && target.children) {
          return target.children;
        }
        return null;
      }
    },
    methods: {
      onClickLeft (option) {
        const selectedCopy = JSON.parse(JSON.stringify(this.selected));
        selectedCopy[this.level] = option;
        if (selectedCopy[this.level + 1]) {
          selectedCopy.splice(this.level + 1);
        }
        this.$emit('update:selected', selectedCopy);
      },
      hasChildren (option) {
        return this.loadData ? !option.isLeaf : option.children;
      }
    }
  };
</script>
<!--这里的递归样式比较难写-->
<style scoped lang="scss">
  @import "../var";
  .self-cascader-item {
    display: flex;
    height: 100%;
    &-left {
      height: 100%;
      overflow: auto;
    }
    &-list {
      display: flex;
      align-items: center;
      white-space: nowrap;
      justify-content: space-between;
      padding: 8px 12px;
      cursor: pointer;
    }
    &-right {
      border-left: 1px solid blue;
    }
    .next-loading {
      @include loading(0.8);
    }
    .next, .next-loading {
      font-size: 12px;
      margin-left: 8px;
    }
  }
</style>
