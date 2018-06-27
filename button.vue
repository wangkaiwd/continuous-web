<template>
  <button class="g-botton"></button>
</template>

<script>
export default {};
</script>

<style lang="scss">
.g-button {
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1rem;
  background-color: var(--button-bg);
  border-radius: var(--border-radius);
  color: var(--color);
  border: 1px solid var(--border-color);
}

.g-button:focus {
  outline: none;
}

.g-button:hover {
  border-color: var(--border-color-hover);
}

.g-button:active {
  background-color: var(--button-active-bg);
}
</style>
