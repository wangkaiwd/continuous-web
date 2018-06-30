<template>
  <button class="g-button">
    <g-icon
        v-if="icon"
        :class="`icon-${iconPosition}`"
        :name="icon"
    />
    <g-icon class="icon-loading" name="loading"></g-icon>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      icon: {},
      iconPosition: {
        type: String,
        default: "left",
        // 自定义验证函数，return true通过校验，return false不通过校验
        validator(value) {
          return value === "left" || value === "right";
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .g-button {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    background-color: var(--button-bg);
    border-radius: var(--border-radius);
    color: var(--color);
    border: 1px solid var(--border-color);
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: var(--border-color-hover);
      background-color: var(--button-active-bg);
    }
    .icon-right {
      margin-left: 0.3em;
      order: 1;
    }

    .icon-left {
      margin-right: 0.3em;
    }
    .icon-loading {
      animation: spin 1s infinite linear;
    }
  }
</style>
