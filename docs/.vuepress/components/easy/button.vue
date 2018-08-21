<template>
  <div class="button">
    <div class="row">
      <g-button icon="setting">按钮</g-button>
      <g-button :loading="true">按钮</g-button>
      <g-button icon="thumbs-up">按钮</g-button>
      <g-button icon="success" icon-position="right">按钮</g-button>
    </div>
    <div class="row">
      <g-button-group>
        <g-button icon="left">前进</g-button>
        <g-button icon="right" icon-position="right">后退</g-button>
      </g-button-group>
    </div>
  </div>
</template>
<script>
  import Button from '../../../../src/button'
  import ButtonGroup from '../../../../src/button-group'

  export default {
    components: {
      GButton: Button,
      GButtonGroup: ButtonGroup
    }
  }
</script>
<style lang="scss" scoped>
  .button {
    .row {
      margin-top: 10px;
    }
  }
</style>