<template>
  <div class="input">
    <div class="row">
      <g-input value="姓名"></g-input>
      <g-input value="禁用" disabled></g-input>
      <g-input value="只读" readonly></g-input>
    </div>
    <div class="row">
      <g-input error="请输入正确的文本内容"></g-input>
    </div>
    <div class="row">
      <g-input v-model="text"></g-input><!--
      --><span class="text">文字内容：{{text}}</span>
    </div>
  </div>
</template>

<script>
  import Input from '../../../../src/input'

  export default {
    name: 'input',
    components: {
      GInput: Input,
    },
    data () {
      return {
        text: '双向绑定',
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    .text {
      display: inline-block;
      margin-left: 10px;
      margin-top: 36px;
    }
  }
</style>