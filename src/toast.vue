<template>
  <div class="global-toast" :class="`position-${position}`">
    <div class="animation-wrapper">
      <div class="message-content">
        <div v-if="enableHTML" class="message" v-html="message"></div>
        <div v-else class="message">{{message}}</div>
      </div>
      <span class="close-button" @click="onClickclose" v-if="closeButton">{{closeButton.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GlobalToast',
    props: {
      message: {type: String, default: 'toast描述'},
      autoClose: {type: Boolean, default: false},
      autoCloseDelay: {type: Number, default: 4000},
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭', onCancel () {this.close()}
          }
        }
      },
      enableHTML: {type: Boolean, default: false},
      position: {
        type: String,
        default: 'top',
        validator (val) {
          return ['top', 'middle', 'bottom'].indexOf(val) > -1
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
      },
      onClickclose () {
        if (this.closeButton && typeof this.closeButton.onCancel === 'function') {
          this.closeButton.onCancel.call(this)
          this.close()
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .global-toast {
    position: fixed;left: 50%;transform: translateX(-50%);
    @keyframes slide-up {
      0% {opacity: 0;transform: translateY(100%);}
      100% {opacity: 1;}
    }
    @keyframes slide-down {
      0% {opacity: 0;transform: translateY(-100%);}
      100% {opacity: 1;}
    }
    @keyframes fade-in {
      0% {opacity: 0;}
      100% {opacity: 1;}
    }
    &.position-top {top: 0;
      .animation-wrapper {animation: slide-down .3s}
    }
    &.position-middle {top: 50%;transform: translate(-50%, -50%);
      .animation-wrapper {animation: fade-in .3s}
    }
    &.position-bottom {bottom: 0;
      .animation-wrapper {animation: slide-up .3s}
    }
    .animation-wrapper {
      display: flex;color: #fff;background: rgba(0, 0, 0, 0.74);
      border-radius: 4px;box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
      padding: 0 16px;min-height: 40px;
      .close-button {
        padding-left: 16px;border-left: 1px solid #666;
        margin-left: 16px;cursor: pointer;flex-shrink: 0;
        display: flex;justify-content: center;align-items: center;
      }
      .message-content {padding: 8px 0;display: flex;justify-content: center;align-items: center;}
    }
  }
</style>