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
        <g-icon name="s-right"></g-icon>
      </div>
      <!--  将所有的子集放到这里  -->
    </div>

    <div class="self-cascader-item-right" v-if="childItem.length > 0">
      <!--  这样做的一个好处  -->
      <self-cascader-item
        :options="childItem"
      >
      </self-cascader-item>
    </div>
  </div>
</template>

<script>
  import GIcon from '../icon';

  export default {
    name: 'SelfCascaderItem',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        childItem: []
      };
    },
    components: { GIcon },
    computed: {},
    methods: {
      onClickLeft (option) {
        const childItem = this.options
          .find(item => item.value === option.value);
        if (childItem.children) {
          this.childItem = childItem.children;
        } else {
          this.childItem = [];
        }
      }
    }
  };
</script>
<!--这里的递归样式比较难写-->
<style scoped lang="scss">
  .self-cascader-item {
    display: flex;
    height: 100%;
    &-left {
      height: 100%;
    }
    &-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
    }
    &-right {
      border-left: 1px solid blue;
    }
  }
</style>
