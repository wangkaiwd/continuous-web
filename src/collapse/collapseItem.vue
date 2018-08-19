<template>
  <div class="collapse-item">
    <div class="title" @click="toggle">
      <span>{{title}}</span>
      <span class="title-icon" :class="{active}"><g-icon name="right-arrow"></g-icon></span>
    </div>
    <div class="content" v-if="active">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CollapseItem',
    props: {
      title: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    inject: ['eventBus'],
    data () {
      return {
        active: false
      }
    },
    mounted () {
      if (this.$parent.selected.includes(this.name)) {
        this.active = true
      }
      // 相当于进行一个事件的监听，不用在updated中进行监听
      this.$parent.single && this.eventBus.$on('changeContent', (vm) => {
        if (vm !== this) {
          this.active = false
          this.eventBus.$emit('closeContent', this)
        }
      })

    },
    methods: {
      toggle () {
        this.active = !this.active
        if (this.active === true) {
          this.eventBus.$emit('openContent', this)
        }
        if (this.active === false) {
          this.eventBus.$emit('closeContent', this)
        }
        if (this.active && this.$parent.single) {
          this.eventBus.$emit('changeContent', this)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: #ddd;
  .collapse-item {
    > .title {
      padding: 0.5em 1em;
      min-height: 32px;
      border-bottom: 1px solid $border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-icon {
        transition: all .3s;
        display: flex;
        justify-content: center;
        align-items: center;}
      > .active {transform: rotate(90deg);}
    }
    &:last-child > .title:last-child {
      border: 0;
    }
    > .content {
      padding: 0.5em 1em;
      border-bottom: 1px solid $border-color;
      transition: all 1s;
    }
    &:last-child > .content {
      border: 0;
    }
  }
</style>