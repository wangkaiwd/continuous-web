<template>
  <div class="grid">
    <g-row class="row">
      <g-col class="col">1</g-col>
      <g-col class="col" span="14">2</g-col>
      <g-col class="col-right" span="10">3</g-col>
      <g-col class="col" span="12">4</g-col>
      <g-col class="col-right" span="12">5</g-col>
    </g-row>
  </div>
</template>

<script>
  import GRow from '../../../../src/row'
  import GCol from '../../../../src/col'

  export default {
    name: 'grid',
    components: {GRow, GCol}
  }
</script>

<style lang="scss" scoped>
  .col,
  .col-right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
    background-color: rgba(0, 160, 233, 0.7);
  }

  .col-right {
    background-color: rgba(0, 0, 0, .1);
  }
</style>