<template>
  <div class="button">
    <g-button icon="setting">按钮</g-button>
    <g-button :loading="true">按钮</g-button>
    <g-button>按钮</g-button>
  </div>
</template>
<script>
  import Button from '../../../../src/button'

  export default {
    components: {
      GButton: Button,
    }
  }
</script>