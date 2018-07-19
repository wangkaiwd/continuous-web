<template>
  <div class="global-toast">
    <slot></slot>
    <span class="close-button" v-if="closeButton">{{closeButton.text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'GlobalToast',
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 4000
      },
      closeButton: {
        type: Object,
        default: {
          text: '关闭',
          /*onCancel () {
            this.close()
          }*/
        }
      }
    },
    mounted () {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay)
      }
    },
    methods: {
      close () {
        this.$el.remove()
        //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令和事件监听器
        this.$destroy()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global-toast {
    position: fixed;top: 0;left: 50%;transform: translateX(-50%);
    color: #fff;background: rgba(0, 0, 0, 0.74);border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);padding: 0 16px;
    height: 40px;line-height: 40px;
    .close-button {display: inline-block;padding-left: 16px;border-left: 1px solid #666;margin-left: 16px;}
  }
</style>