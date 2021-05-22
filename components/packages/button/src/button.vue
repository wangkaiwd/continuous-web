<template>
  <div class="button">
    按钮
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Button',
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state)
    };
  },
});
</script>

<style lang="less" scoped>
.button {

}
</style>