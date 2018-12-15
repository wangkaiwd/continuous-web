<template>
  <div class="component-wrapper">
    <!--要把轮播的每一项也设置为子组件，否则要进行dom操作了-->
    <g-slide :select="select">
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
      let n = 1
      setInterval(() => {
        n++
        if (n > 3) { n = 1}
        this.select = n.toString()
      }, 1000)
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .component-wrapper {
    .box {
      width: 200px;
      height: 200px;
      background-color: #ddd;
      border: 1px solid red;
    }
  }
</style>