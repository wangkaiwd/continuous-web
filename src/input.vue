<template>
  <div class="wrapper-input" :class="{error}">
    <!--input的value:控件的初始值，此属性是可选的-->
    <input
      :value="value"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('input',$event.target.value)"
      @change="$emit('change',$event)"
    >
    <template v-if="error">
      <global-icon class="input-icon" name="error"></global-icon>
      <span class="error-message">{{error}}</span>
    </template>
  </div>
</template>
<script>
  /**
   * v-model本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
   * v-model会忽略所有表单元素的value,checked,selected特性的初始值，而总是将Vue实例的数据作为数据来源
   * 要实现v-model:
   *  1. value绑定传来的value(value:input的初始值)
   *  2. input事件 value = $event.target.value
   */
  import GlobalIcon from './icon'

  export default {
    name: 'GlobalInput',
    props: {
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      error: {
        type: String,
      }
    },
    components: {
      GlobalIcon,
    }
  }
</script>
<style lang="scss" scoped>
  /*--button-height: 32px;
  --font-size: 14px;
  --button-bg: white;
  --button-active-bg: #eee;
  --border-radius: 4px;
  --color: #333;
  --border-color: #999;
  --border-color-hover: #666;*/
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $border-radius: 4px;
  $font-size: 12px;
  $box-shadow-color: rgba(0, 0, 0, 0.5);
  $red: #F1453D;
  .wrapper-input {font-size: $font-size;display: inline-flex;align-items: center;justify-content: center;margin-top: 30px;
    :not(:last-child) {margin-right: 4px;}
    > input {height: $height;border: 1px solid $border-color;border-radius: $border-radius;font-size: $font-size;padding: 0 8px;
      &:hover {border-color: $border-color-hover;}
      &:focus {box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}
      &[disabled],
      &[readonly] {border-color: #bbb;color: #bbb;cursor: not-allowed;}
    }
    &.error {
      > input {border-color: $red;}
    }
    .input-icon {color: $red;}
    .error-message {color: $red;}
  }
</style>