<template>
  <div class="cascader">
    <div class="trigger" @click="visible=!visible">
      <!--<slot></slot>-->
      click
    </div>
    <div class="popover">
      <cascader-child :optionsItem="options" v-if="visible"></cascader-child>
    </div>
  </div>
</template>
<script>
  import CascaderChild from './cascaderChild'

  export default {
    name: 'GlobalCascader',
    components: {
      CascaderChild
    },
    props: {
      options: {
        type: Array
      }
    },
    data () {
      return {
        visible: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../var';

  .cascader {
    position: relative;
    .trigger {
      width: 100px;
      height: $button-height;
      border: 1px solid red;
    }
    .popover {
      @extend .box-shadow;
    }
  }
</style>