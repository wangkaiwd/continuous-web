<template>
  <transition :name="transitionName">
    <div class="slide-item" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'GSlideItem',
    props: {
      name: {
        type: String,
      },
    },
    data () {
      return {
        select: '', // 这个参数加在这里的目的是什么？这个参数没有其实也可以，但是加上之后逻辑会变得更简单
        reverse: false // 用来判断是否要反向动画
      }
    },
    computed: {
      visible () {
        return this.select === this.name
      },
      // 语法复习：逻辑与(&&)，expr1 && expr2 如果expr1能转换为false则返回expr1,否则返回 expr2
      // `slide${this.reverse && '-back'}`:
      //  this.reverse = false => 'slidefalse'
      //  this.reverse = true => 'slide-back'
      transitionName () {
        return `slide${this.reverse ? '' : '-back'}`
      }
    }
  }
  //  在为轮播组件里的元素设置绝对定位以后，内容将不再占据位置
  //  这里不能用js来动态获取高度，因为里边的内容可能是图片，而图片加载是一个异步的过程，会导致获取的宽高不准确
</script>

<style lang="scss" scoped>
  .slide-enter {
    transform: translateX(100%);
  }

  /*
    v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效（与此同时v-leave被删除），
    在过渡/动画完成之后移除
  */
  .slide-leave-to {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 1s;
  }

  .slide-back-enter {
    transform: translateX(-100%);
  }

  .slide-back-leave-to {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(100%);
  }

  .slide-back-enter-active,
  .slide-back-leave-active {
    transition: all 1s;
  }
</style>