<template>
  <div class="pagination">
    <div
      class="pagination-nav prev"
      @click="onClick(current-1)"
      :class="{disabled: current<=1}"
    >
      <g-icon name="s-left"></g-icon>
    </div>
    <div class="numbers">
      <ul>
        <!--这里要根据不同的number来区分...和数字-->
        <!--如果外层不嵌套template只能加类，不能根据不同的number来渲染不同的html-->
        <!--key不能给template加-->
        <template
          v-for="(number,i) in numbers"
        >
          <li
            v-if="number === '...'"
            class="pagination-item separator"
            :key="i"
          >
            <g-icon name="ellipsis"></g-icon>
          </li>
          <li
            v-else-if="number === current"
            class="pagination-item active"
            @click="onClick(number)"
            :key="i"
          >
            {{number}}
          </li>
          <li
            v-else
            class="pagination-item others"
            @click="onClick(number)"
            :key="i"
          >
            {{number}}
          </li>
        </template>
      </ul>
    </div>
    <div
      class="pagination-nav next"
      @click="onClick(current+1)"
      :class="{disabled: current >= totalPage}"
    >
      <g-icon name="s-right"></g-icon>
    </div>
  </div>
</template>

<script>
  import GIcon from '../icon';

  /**
   * 页码条数的几种情况
   *  1. 条数小于7： 1,2,3,4   1,2,3,4,5,6,7
   *  2. 条数大于7：
   *    a. 1,...,3,4,5,6,7,8
   *    b. 1,...,3,4,5,6,7,...,10
   *    c. 1,2,3,4,5,6,...,10
   *    d. 1,...,5,6,7,8,9,10
   *
   *  总结规律：
   *    1. 1开头，总条数结尾，当前页数/+1/+2/-1/-2,
   *    2. 页数如果小于7，数组个数为总页数，并且不会出现...
   *    3. 当前页数如果<总页数-3,当前页数变大，不会影响到展示个数
   *    4. a.去重,b.过滤小于1的元素,c.过滤大于总页数的元素
   */
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
        let pages;
        // 通过将数组固定内容写死，会减少很大一部分的逻辑运算
        if (current < 5) {
          pages = [1, 2, 3, 4, 5, 6, totalPage];
        } else if (current > totalPage - 3) {
          pages = [1, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
        } else {
          pages = [1, current - 2, current - 1, current, current + 1, current + 2, totalPage];
        }
        // 1.删除<1 2.去重 3.删除>totalPage
        const newPages = pages.filter((page, i) => page >= 1 && i === pages.indexOf(page) && page <= totalPage)
        // 要重新建立一个数组并进行操作，会节省代码量
          .reduce((prev, page, i, array) => {
            prev.push(page);
            if (array[i + 1] && array[i + 1] - page > 1) {
              prev.push('...');
            }
            return prev;
          }, []);
        return newPages;
      }
    },
    methods: {
      onClick (current) {
        if (current < 1) return;
        if (current > this.totalPage) return;
        this.$emit('update:current', current);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../var";
  .pagination {
    $width: 32px;
    $height: 32px;
    display: flex;
    margin-left: -8px;
    color: rgba(0, 0, 0, .65);
    .numbers {
      display: flex;
      ul {display: flex;}
    }
    &-item,
    &-nav {
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: $height;
      /*这里不能使用固定宽度，因为分页条数不确定，可能是10,1000，会导致超出宽度*/
      min-width: $height;
      border-radius: $border-radius;
      border: 1px solid $border-color-shallow;
      margin-left: 8px;
      &:hover,
      &.active {
        border-color: $blue;
        font-weight: 500;
        color: $blue;
      }
    }
    .disabled {
      border-color: $border-color-shallow;
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      &:hover {
        border-color: $border-color-shallow;
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .separator {
      border: 1px solid $border-color-shallow;
      color: rgba(0, 0, 0, .65);
      &:hover {
        cursor: default;
        border: 1px solid $border-color-shallow;
        color: rgba(0, 0, 0, .65);
      }
    }
  }
</style>
