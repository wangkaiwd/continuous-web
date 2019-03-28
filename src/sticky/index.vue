<template>
  <div class="wd-sticky">
    <div class="wd-sticky-placeholder" ref="stickPlaceholder">
      <div class="wd-sticky-wrapper" ref="stickyWrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WdSticky',
    mounted () {
      const { height, top, left } = this.$refs.stickyWrapper;
      const placeholder = this.$refs.stickPlaceholder;
      placeholder.style.height = height + 'px';
    }
  };
</script>

<style scoped lang="scss">
  .wd-sticky {
    &-placeholder {
      width: 100%;
    }
    &-wrapper {
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
</style>
