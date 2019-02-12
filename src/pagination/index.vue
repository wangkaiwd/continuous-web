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
        // [1,2,3,4,5,6,7]
        const pages = [1, current - 2, current - 1, current, current + 1, current + 2, totalPage];
        //  1.去重  2.去除小于0的内容
        const newPages = pages.filter((page, i) => page >= 1 && i === pages.indexOf(page) && page <= totalPage);
        return newPages;
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
