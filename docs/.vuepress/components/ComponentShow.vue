<template>
  <div class="component-show">
    <div class="component-show-header">
      <div class="component-show-header-title">
        <h3>类型</h3>
        <button class="component-show-header-title-button" @click="expand=!expand">
          <g-icon class="component-show-header-title-button-icon" :class="{expand}" name="s-right"></g-icon>
          <span class="component-show-header-title-button-text">show code</span>
        </button>
      </div>
    </div>
    <div class="component-show-body">
      <slot></slot>
    </div>
    <div class="component-show-code" :class="{expand}">
      <slot name="code"></slot>
    </div>
  </div>
</template>

<script>
  import GIcon from '../../../src/icon';

  export default {
    name: 'componentShow',
    components: { GIcon },
    data () {
      return {
        expand: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  .component-show {
    &-header-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eaecef;
    }
    &-header-title-button {
      display: flex;
      align-items: center;
      vertical-align: top;
      padding: 10px 12px;
      line-height: 1;
      border-radius: 4px;
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
    &-header-title-button-text {
      font-size: 14px;
      font-weight: 300;
      margin: 0 4px;
      &:active {
        border: none;
      }
    }
    &-header-title-button-icon {
      font-size: 16px;
      color: rgb(16, 110, 190);
      transition: all .3s;
    }
    &-header-title-button-icon.expand {
      transform: rotate(90deg);
    }
    &-code {
      height: 0;
      transition: all .3s;
      overflow: auto;
      max-height: 300px;
    }
    &-code.expand {
      height: 240px;
    }
  }
</style>
