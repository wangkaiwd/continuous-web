<template>
  <div class="app">
    <h3>vue3 vite ts</h3>
    <h4>{{ todos.result?.name }}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface IResult {
  id: number;
  name: string;
  completed: boolean;
}

interface TodoProps {
  result: null | IResult
}

export default defineComponent({
  name: 'App',
  components: {},
  setup () {
    const todos = reactive<TodoProps>({ result: null });
    return {
      todos
    };
  }
});
</script>

<style>
</style>
