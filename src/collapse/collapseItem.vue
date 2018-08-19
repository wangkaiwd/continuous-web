<template>
  <div class="collapse-item">
    <div class="title" @click="active = !active">
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
      }
    },
    data () {
      return {
        active: false
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
        transition: all .4s;
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