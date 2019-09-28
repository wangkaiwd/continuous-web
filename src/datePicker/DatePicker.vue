<template>
  <div class="self-ui-date-picker">
    <g-input @focus="onFocus" @blur="onBlur"></g-input>
    <div class="self-ui-date-picker-panels" v-if="visible">
      日历面板
    </div>
  </div>
</template>

<script>
  import GInput from '../input';

  export default {
    name: 'SelfDatePicker',
    components: { GInput },
    data () {
      return {
        visible: false
      };
    },
    methods: {
      onFocus () {
        this.visible = true;
      },
      onBlur () {
        this.visible = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/var";
  .self-ui-date-picker {
    &-panels {
      width: 100px;
      height: 100px;
      background-color: pink;
      border: 1px solid $border-color;
    }
  }
</style>
