<template>
  <button class="g-button"
          @click="$emit('click')">
    <g-icon v-if="icon && !loading"
            :class="`icon-${iconPosition}`"
            :name="icon">
    </g-icon>
    <g-icon
      v-if="loading"
      :class="['icon-loading',`icon-${iconPosition}`]"
      name="loading"
    >
    </g-icon>
    <slot></slot>
  </button>
</template>

<script>
  import Icon from './icon';

  export default {
    name: 'GlobalButton',
    props: {
      icon: {
        type: String,
        required: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        // 自定义验证函数，return true通过校验，return false不通过校验
        validator (value) {
          return value === 'left' || value === 'right';
        }
      }
    },
    components: {
      'g-icon': Icon,
    }
  };
</script>

<style lang="scss" scoped>
  @import "var";
  $font-size: 14px;
  $button-height: 32px;
  $button-bg: white;
  $border-radius: 4px;
  $color: #333;
  $border-color: #999;
  $border-color-hover: #666;
  $button-active-bg: #eee;


  .g-button {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    background-color: $button-bg;
    border-radius: $border-radius;
    color: $color;
    border: 1px solid $border-color;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: $border-color-hover;
      background-color: $button-active-bg;
    }
    .icon-right {
      margin-left: 0.3em;
      order: 1;
    }

    .icon-left {
      margin-right: 0.3em;
    }
    .icon-loading {
      @include loading;
    }
  }
</style>
