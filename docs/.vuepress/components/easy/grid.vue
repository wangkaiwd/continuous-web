<template>
  <div class="grid">
    <g-row class="row">
      <h4>基础栅格</h4>
      <g-col>
        <div class="col">1</div>
      </g-col>
      <g-col span="14">
        <div class="col">2</div>
      </g-col>
      <g-col span="10">
        <div class="col-right">3</div>
      </g-col>
      <g-col span="12">
        <div class="col">4</div>
      </g-col>
      <g-col span="12">
        <div class="col-right">5</div>
      </g-col>
    </g-row>
    <g-row class="row" gutter="12">
      <h2>区块间隔</h2>
      <g-col>
        <div class="col">
          1
        </div>
      </g-col>
      <g-col span="3">
        <div class="col">2</div>
      </g-col>
      <g-col span="5">
        <div class="col">3</div>
      </g-col>
      <g-col span="6">
        <div class="col-right">4</div>
      </g-col>
      <g-col span="6">
        <div class="col">5</div>
      </g-col>
      <g-col span="4">
        <div class="col">6</div>
      </g-col>
    </g-row>
    <g-row class="row">
      <h4>左右偏移</h4>
      <g-col>
        <div class="col">1</div>
      </g-col>
      <g-col span="6">
        <div class="col">2</div>
      </g-col>
      <g-col span="4" offset="4">
        <div class="col-right">
          3
        </div>
      </g-col>
      <g-col span="5" offset="2">
        <div class="col">4</div>
      </g-col>
      <g-col span="6" offset="2">
        <div class="col-right">
          5
        </div>
      </g-col>
      <g-col span="6" offset="6">
        <div class="col">6</div>
      </g-col>
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
  * {
    box-sizing: border-box;
  }

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