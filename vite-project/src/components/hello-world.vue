<template>
  <div class="hello-world">
    <h2>{{ info.name }}</h2>
    <h3>{{ info.age }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue';

export interface IInfo {
  name: string;
  age: number
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    info: {
      type: Object as PropType<IInfo>,
      required: true
    }
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
.hello-world {

}
</style>