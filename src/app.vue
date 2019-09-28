<template>
  <div>
    <div class="component-wrapper">
      <date-picker></date-picker>
    </div>
  </div>
</template>
<script>
  /**
   * 日期选择器的需求：
   *  1. 选日期：a. 默认选中项 b. 点亮今天 c. 清除功能 d. 范围选择(start,end)
   *  2. 范围选择
   *  3. 只选年
   *  4. 只选月
   */

  import DatePicker from '@/datePicker/DatePicker';

  export default {
    name: 'App',
    components: { DatePicker },
    data () {
      return {};
    },
    mounted () {
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .component-wrapper {
    margin: 40px;
  }
</style>
