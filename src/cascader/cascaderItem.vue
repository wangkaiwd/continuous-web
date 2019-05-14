<template>
  <ul class="self-cascader-item">
    <template v-for="option in options">
      <li
        class="self-cascader-item-list"
        v-for="option in options"
        :key="option.value"
      >
        {{option.label}}
      </li>
      <cascader-item
        v-if="option.children"
        :options="option.children"
      >
      </cascader-item>
    </template>
  </ul>
</template>

<script>
  export default {
    name: 'cascaderItem',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<style scoped lang="scss">
  .self-cascader-item {
    background-color: pink;
    &-list {
      padding: 8px 12px;
    }
  }
</style>
