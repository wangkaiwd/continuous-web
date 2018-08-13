<template>
  <div class="popover">
    <!--只有修饰符 @click.stop-->
    <div class="content-wrapper" v-show="visible" @click.stop>
      <!--slot添加事件和class都是没有作用的-->
      <slot name="content"></slot>
    </div>
    <div class="button-wrapper" @click.stop="toggleContent">
      <slot name="trigger"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popover',
    data () {
      return {visible: false}
    },
    mounted () {

    },
    methods: {
      toggleContent () {
        this.visible = !this.visible
        // 如果visible是true才需要添加事件，如果是false的话，将visible为true时的事件移除
        if (this.visible) {
          console.log('添加事件')
          document.addEventListener('click', this.listenClick)
        }
        if (!this.visible) {
          console.log('删除事件')
          document.removeEventListener('click', this.listenClick)
        }
      },
      listenClick () {
        this.visible = false
        document.removeEventListener('click', this.listenClick)
        console.log('删除事件')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popover {
    position: relative;display: inline-block;vertical-align: top;
    .content-wrapper {position: absolute;
      /* 元素设置定位之后的偏移量是根据父元素的宽(left)高(top)来进行计算的 */
      bottom: 100%;left: 0;border: 1px solid red;box-shadow: 0 0 3px rgba(0, 0, 0, .5);
    }
  }
</style>