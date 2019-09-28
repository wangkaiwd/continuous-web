<template>
  <div class="self-ui-date-picker" ref="datePicker">
    <g-input @focus="onFocus"></g-input>
    <div class="self-ui-date-picker-panel" v-if="visible">
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
    mounted () {
    },
    beforeDestroy () {
      document.removeEventListener('click', this.listenToDocument);
    },
    methods: {
      listenToDocument (e) {
        const target = e.target;
        const { datePicker } = this.$refs;
        if (!datePicker.contains(target)) {
          this.visible = false;
          document.removeEventListener('click', this.listenToDocument);
        }
      },
      onFocus () {
        this.visible = true;
        document.addEventListener('click', this.listenToDocument);
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/var";
  .self-ui-date-picker {
    display: inline-flex;
    position: relative;
    &-panel {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100px;
      height: 100px;
      background-color: pink;
      border: 1px solid $border-color;
    }
  }
</style>
