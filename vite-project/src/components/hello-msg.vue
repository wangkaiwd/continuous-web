<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'HelloMsg',
  props: {
    msg: String
  },
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state)
    };
  },
});
</script>

<style lang="less" scoped>
.hello {

}
</style>