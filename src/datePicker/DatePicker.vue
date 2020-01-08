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
        <div v-else :class="cls('content-items','content-days')">
          <div :class="cls('content-weeks-items')">
            <div :class="cls('content-weeks-item')" v-for="week in weeks" :key="week">
              {{week}}
            </div>
          </div>
          <div :class="cls('content-days-items')">
            <div :class="cls('content-days-item','content-days-row')" v-for="(row,i) in days" :key="i">
              <div
                :class="cls('content-days-col')"
                v-for="col in row"
                @click="onClickCol"
                :key="`${i}-${col}`"
              >
                {{col}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="cls('tools')">
        今天
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 日历组件比较复杂的地方：
   *    1. 每个月对应的天数
   *
   *  api学习：
   *    Date.prototype.setDate(): 根据本地时间来指定一个日期对象的天数
   *    语法： dateObj.setDate(dayValue)
   *    dayValue: 一个整数，表示该月的第几天
   *
   *    如果dayValue超出了月份的合理范围，setDate将会相应的更新Date对象
   *    例：dayValue=0,日期会被设置为上个月的最后一天。如果dayValue被设置为负数，日期会设置为
   *    上个月最后一天往前数这个负数绝对值天数后的日期。0为上个月的最后一天，-1为上个月的最后一天的前一天，以此类推
   *
   *    Date.prototype.setMonth(): 根据本地时间，为一个设置年份的日期对象设置月份。超出合理范围后的情况与setDate类似
   */
  import GInput from '../input';

  const WEEKS = ['一', '二', '三', '四', '五', '六', '日'];
  const ALL_DAYS = 42;
  export default {
    name: 'SelfDatePicker',
    components: { GInput },
    data () {
      return {
        visible: false,
        mode: 'days',
        weeks: WEEKS,
        days: [],
      };
    },
    mounted () {
      this.days = this.composeDateList();
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
        // node.contains(othersNode): 如果otherNode是node的后代节点或node节点本身，则返回true,否则返回false
        if (!datePicker.contains(target)) {
          this.visible = false;
          document.removeEventListener('click', this.listenToDocument);
        }
      },
      onFocus () {
        this.visible = true;
        document.addEventListener('click', this.listenToDocument);
      },
      // todo:这里要获取的是可以得到Date对象的数组，否则在添加点击事件时无法得到事件对象，从而拿到各种内容
      generateDateList () {
        const today = new Date();
        const startDate = new Date(today.setDate(1));
        const previousStartDay = new Date(today.setDate(0)).getDate();
        const startDay = startDate.getDate();
        const startWeek = startDate.getDay() === 0 ? 7 : startDate.getDate();
        const month = today.getMonth() + 1;
        const endDay = new Date(new Date(today.setMonth(month + 1)).setDate(0)).getDate();
        const days1 = [];
        for (let i = startDay; i <= endDay; i++) {
          days1.push(i);
        }
        const days2 = [];
        for (let i = 0; i < startWeek; i++) {
          days2.push(previousStartDay - i);
        }
        const days3 = [];
        const restDays = ALL_DAYS - endDay - startWeek + 1;
        for (let i = 1; i <= restDays; i++) {
          days3.push(i);
        }
        return [...days2.reverse(), ...days1, ...days3];
      },
      composeDateList () {
        const days = this.generateDateList();
        console.log('days', days);
        const results = [];
        let tempArray = [];
        days.map((day, i) => {
          tempArray.push(day);
          if ((i + 1) % 7 === 0) {
            results.push(tempArray);
            tempArray = [];
          }
        });
        return results;
      },
      onClickCol () {
        console.log('click');
      },
    },
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
      background-color: pink;
      border: 1px solid $border-color;
    }
    &-content-weeks-items {
      display: flex;
    }
    &-content-days-row {
      display: flex;
    }
    &-content-weeks-item, &-content-days-col {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 3px;
    }
    &-content-days-col {
      cursor: pointer;
    }
  }
</style>
