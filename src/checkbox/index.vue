<template>
  <div class="wd-checkbox">
    <input :checked="checked" id="checkbox" :disabled="disabled" type="checkbox">
    <label for="checkbox" class="wd-checkbox-label" :class="{disabled}">
    </label>
  </div>
</template>

<script>
  export default {
    name: 'WdCheckbox',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped lang="scss">
  .wd-checkbox {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    &-label {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1890ff;
      border-radius: 2px;
      cursor: pointer;
    }
    input[type="checkbox"] {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
    /*:checked伪类选择器：表示任何处于选中状态的radio,checkbox,或select元素中的option HTML元素*/
    /*+：紧邻兄弟选择器，选择下一个相邻的兄弟元素*/
    input[type="checkbox"]:checked + label {
      background-color: #1890ff;
      &:after {
        content: '';
        display: inline-block;
        border: 2px solid #fff;
        width: 5px;
        height: 9px;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
      }
    }
    .wd-checkbox-label.disabled {
      cursor: not-allowed;
      border-color: #d9d9d9;
      background-color: #f5f5f5 !important;
      &:after {
        border-color: rgba(0, 0, 0, 0.25) !important;
      }
    }
    .disabled {
      cursor: not-allowed;
      border-color: #d9d9d9;
      background-color: #f5f5f5;
    }
  }
</style>
