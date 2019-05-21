<template>
  <div class="self-cascader-item">
    <!--  将所有的父级放到一起  -->
    <div class="self-cascader-item-left">
      <div
        v-for="option in options"
        class="self-cascader-item-list"
        :key="option.value"
      >
        {{option.label}}
      </div>
      <!--  将所有的子集放到这里  -->
    </div>

    <div class="self-cascader-item-right">
      <!--  这样做的一个好处  -->
      <template v-for="option in options">
        <self-cascader-item
          :options="option.children"
          v-if="option.children"
          :key="option.value"
        >
        </self-cascader-item>
      </template>
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
    }
  };
</script>
<!--这里的递归样式比较难写-->
<style scoped lang="scss">
  .self-cascader-item {
    display: flex;
    &-left {
      width: 100px;
    }
    &-list {
      padding: 8px 12px;
    }
  }
</style>
