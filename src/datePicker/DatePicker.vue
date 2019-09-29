<template>
  <div class="self-ui-date-picker" ref="datePicker">
    <g-input @focus="onFocus"></g-input>
    <div :class="cls('panel')" v-if="visible">
      <div :class="cls('navigation')">
        << <
        <span @click="mode='years'">2019年</span>
        <span @click="mode='months'">9月</span>
        > >>
      </div>
      <div :class="cls('content-wrapper')" @click="mode='days'">
        <div v-if="mode === 'years'" :class="cls('content-item','content-years')">
          年
        </div>
        <div v-else-if="mode === 'months'" :class="cls('content-item','content-months')">
          月
        </div>
        <div v-else :class="cls('content-item','content-days')">
          日
        </div>
      </div>
      <div :class="cls('tools')">
        今天
      </div>
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
        visible: false,
        mode: 'days'
      };
    },
    mounted () {
    },
    beforeDestroy () {
      document.removeEventListener('click', this.listenToDocument);
    },
    methods: {
      cls (...classNames) {
        return classNames.map(className => `self-ui-date-picker-${className}`);
      },
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
      min-width: 16em;
      background-color: pink;
      border: 1px solid $border-color;
    }
  }
</style>
