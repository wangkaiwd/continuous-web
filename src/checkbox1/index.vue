<template>
  <div class="wk-checkbox">
    <!--label mdn: 用户界面中项目的标题-->
    <!--它通常关联一个控件，或者将控件放置在label元素内，或者是用作其属性。这样的控制称做label元素的labeled control-->
    <!--这里不能通过id来进行命名，当复用组件的时候会出现问题-->
    <label class="wk-checkbox-label" :class="{disabled}">
      <!--
        vm.$attrs: 包含了父作用域中不作为prop被识别（且获取）的特性绑定(class和style除外)
                   当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定(class和style)除外，
                   并且可以通过v-bind="$attrs"传入内部组件---在创建高级别的组件时非常有用
      -->
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        @change="onChange"
      >
      <span class="tick-wrapper">
        <wd-icon class="tick-icon" name="tick"></wd-icon>
      </span>
      <slot></slot>
    </label>
  </div>
</template>

<script>
  import WdIcon from '../icon';

  export default {
    name: 'WkCheckbox',
    components: { WdIcon },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
    },
    model: {
      prop: 'checked', // 通过v-model传来的属性
      event: 'change' // 通过change事件更新prop
    },
    data () {
      return {
        checkStatus: false
      };
    },
    mounted () {
      // console.log(this.model);
    },
    methods: {
      onChange (e) {
        // console.log('e', e.target.checked);
        this.$emit('change', e.target.checked);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../var";
  .wk-checkbox {
    $blue: #1890ff;
    $gray: #f5f5f5;
    display: inline-flex;
    .wk-checkbox-label {
      display: inline-flex;
      width: 15px;
      height: 15px;
      border: 1px solid $blue;
      border-radius: 2px;
      &.disabled {
        border-color: #d9d9d9;
        background-color: $gray;
        .tick-wrapper {
          color: rgba(0, 0, 0, 0.25);
          background-color: $gray;
        }
      }
      & > .tick-wrapper {
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
        opacity: 0;
      }
    }
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"]:checked + span {
      background-color: $blue;
      opacity: 1;
    }
  }
</style>
