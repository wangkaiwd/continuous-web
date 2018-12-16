<template>
  <div class="component-wrapper">
    <!--要把轮播的每一项也设置为子组件，否则要进行dom操作了-->
    <g-slide :select.sync="select" :auto-play="false">
      <g-slide-item name="1">
        <div class="box">1</div>
      </g-slide-item>
      <g-slide-item name="2">
        <div class="box">2</div>
      </g-slide-item>
      <g-slide-item name="3">
        <div class="box">3</div>
      </g-slide-item>
    </g-slide>
  </div>
</template>
<script>
  import GSlide from './slide/slide'
  import GSlideItem from './slide/slideItem'

  export default {
    name: 'App',
    components: {GSlide, GSlideItem},
    data () {
      return {
        select: '1'
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
    .box {
      width: 100%;
      height: 400px;
      background-color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 100px;
      color: red;
      font-weight: bold;
    }
  }
</style>