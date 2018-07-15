<template>
  <div class="global-col" :style="{flex: currentFlex}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GlobalCol',
    props: {
      span: {
        type: [String, Number]
      }
    },
    data () {
      return {
        flex: 24,
      }
    },
    computed: {
      currentFlex () {
        return this.span / 24
      }
    }
  }
</script>
<style lang="scss" scoped>
  .global-col {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: skyblue;
    border: 1px solid red;
    flex: 1;
  }
</style>
