<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    mounted() {
      const nodes = this.$el.children;
      for(let node of nodes){
        const nodeName = node.tagName.toLowerCase();
        if(nodeName !== 'button') {
          console.warn(`g-button-group组件中的每一个子元素都应是g-button,而现在是${nodeName},会影响正常显示`);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $border-radius: 4px;
  .g-button-group {
    // 行内元素，具备弹性
    display: inline-flex;
    vertical-align: top;
    >>> .g-button {
      border-radius: 0;
      &:not(:first-child) {
        margin-left: -1px;
      }
    }
    & /deep/ :first-child {
      border-bottom-left-radius: $border-radius;
      border-top-left-radius: $border-radius;
    }
    & /deep/ :last-child {
      border-bottom-right-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
    >>> .g-button:hover {
      position: relative;
      z-index: 1;
    }
  }

</style>

