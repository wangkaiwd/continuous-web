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
      </div>
      <!--  将所有的子集放到这里  -->
    </div>

    <div class="self-cascader-item-right">
      <!--  这样做的一个好处  -->
      <self-cascader-item
        :options="childItem.children"
        v-if="childItem.children"
      >
      </self-cascader-item>
    </div>
  </div>
</template>

<script>
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
    computed: {},
    methods: {
      onClickLeft (option) {
        const childItem = this.options
          .find(item => item.value === option.value);
        this.childItem = childItem || [];
      }
    }
  };
</script>
<!--这里的递归样式比较难写-->
<style scoped lang="scss">
  .self-cascader-item {
    display: flex;
    &-left {
      width: 100px;
      background-color: pink;
      border: 1px solid blue;
      height: 200px;
      margin-left: 10px;
    }
    &-list {
      padding: 8px 12px;
    }
  }
</style>
