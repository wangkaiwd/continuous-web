<template>
  <div class="wd-uploader">
    <div class="trigger" ref="trigger">
      <slot></slot>
      <input class="upload-input" type="file">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WdUploader',
    data () {
      return {};
    },
    mounted () {
      const { height, width } = this.$refs.trigger.getBoundingClientRect();
      console.log('size', width, height);
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .wd-uploader {
    .trigger {
      position: relative;
      display: inline-flex;
    }
    .upload-input {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: -1;
    }
  }
</style>
