<template>
  <div class="pagination">
    <div class="prev" @click="onClick('prev')" :class="{disabled: current<=1}">
      <g-icon name="s-left"></g-icon>
    </div>
    <div class="numbers">
      <ul>
        <li
          v-for="(number,i) in numbers"
          :key="i"
          :class="{active: number === current}"
          @click="onClick(number)"
        >
          {{number}}
        </li>
      </ul>
    </div>
    <div class="next" @click="onClick('next')" :class="{disabled: current >= totalPage}">
      <g-icon name="s-right"></g-icon>
    </div>
  </div>
</template>

<script>
  import GIcon from '../icon';

  const PAGE_LENGTH = 7;
  export default {
    props: {
      hideOnSinglePage: {
        type: Boolean,
        default: true
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      current: {
        type: Number,
        default: 1
      },
      change: {
        type: Function,
        default () {

        }
      }
    },
    name: 'WdPagination',
    components: { GIcon },
    data () {
      return {
        // numbers: []
      };
    },
    computed: {
      totalPage () {
        return Math.ceil(this.total / this.pageSize);
      },
      numbers () {
        const { current, totalPage } = this;
        const array = [];
        for (let i = 1; i < 7; i++) {
          array.push(i);
        }
        array.push(totalPage);
        if (totalPage > 7) {
          if (current > 5) {
            array[current - 2] = current - 1;
            array[current - 3] = current - 2;
            array.splice(1, 0, '...');
          }
          if (current < totalPage - 3) {
            // 第一个参数如果是负数，则表示从数组末位开始的第几位(从-1计数)
            array[current] = current + 1;
            array[current + 1] = current + 2;
            array.splice(-1, 0, '...');
          }
        }
        return array;
      }
    },
    methods: {
      onClick (flag) {
        const { current, totalPage } = this;
        if (flag === 'prev') {
          if (current <= 1) return;
          this.$emit('update:current', current - 1);
        }
        if (flag === 'next') {
          if (current >= totalPage) return;
          this.$emit('update:current', current + 1);
        }
        if (typeof flag === 'number') {
          this.$emit('update:current', flag);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    margin-left: -8px;
    color: rgba(0, 0, 0, .65);
    .numbers {
      display: flex;
      ul {display: flex;}
    }
    li,
    .prev,
    .next {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      margin-left: 8px;
      &:hover,
      &.active {
        border-color: #1890ff;
        font-weight: 500;
        color: #1890ff;
      }
    }
    .disabled {
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      &:hover {
        border-color: #d9d9d9;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>
