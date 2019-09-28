<template>
  <div>
    <div class="component-wrapper">
      <date-picker></date-picker>
    </div>
  </div>
</template>
<script>


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
