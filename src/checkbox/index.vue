<template>
  <div class="wd-checkbox">
    <input id="checkbox" type="checkbox">
    <label for="checkbox" class="wd-checkbox-label"></label>
  </div>
</template>

<script>
  export default {
    name: 'WdCheckbox',
  };
</script>

<style scoped lang="scss">
  .wd-checkbox {
    display: inline-flex;
    &-label {
      width: 14px;
      height: 14px;
      border: 1px solid #1890ff;
      border-radius: 4px;
    }
  }
</style>
