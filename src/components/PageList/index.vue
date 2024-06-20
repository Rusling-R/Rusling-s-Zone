<template>
  <div class="pageList-container">
    <a
      :class="{ disabled: curr === 1 }"
      @click="skipTo($event, 1)">
      <Icon name="double-left" />
    </a>
    <a
      :class="{ disabled: curr === 1 }"
      @click="skipTo($event, curr - 1)">
      <Icon name="left" />
    </a>
    <a
      v-for="item in pageList"
      :class="{ curr: item.id === curr }"
      :key="item.id"
      @click="skipTo($event, item.page)">
      {{ item.page }}
    </a>
    <a
      :class="{ disabled: curr === max }"
      @click="skipTo($event, curr + 1)">
      <Icon name="right" />
    </a>
    <a
      :class="{ disabled: curr === max }"
      @click="skipTo($event, max)">
      <Icon name="double-right" />
    </a>
  </div>
</template>

<script>
  import Icon from '@/components/Icon';

  export default {
    name: 'PageList',
    props: {
      curr: {
        type: Number,
        default: 1
      },
      limits: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        required: true
      },
      length: {
        type: Number,
        default: 10
      }
    },
    computed: {
      max() {
        // 计算最大页数
        return Math.ceil(this.total / this.limits);
      },
      left() {
        // 计算左边界
        let res = this.curr - Math.floor(this.length / 2);
        res = this.max - res < this.length - 1 ? this.max - this.length + 1 : res;
        return res < 1 ? 1 : res;
      },
      right() {
        // 计算右边界
        let res = this.left + this.length - 1;
        return res > this.max ? this.max : res;
      },

      pageList() {
        let res = [];
        for (let i = this.left; i <= this.right; i++) {
          res.push({
            page: i,
            id: i
          });
        }
        return res;
      }
    },
    components: {
      Icon
    },
    methods: {
      skipTo(e, pageNum) {
        e.preventDefault();
        // 判断是否可以转页
        if (pageNum < 1 || pageNum > this.max || pageNum === this.curr) {
          return;
        }
        // 触发事件通知父组件
        this.$emit('pageChange', pageNum);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '~@/styles/var.less';

  .pageList-container {
    width: 100%;
    font-size: 16px;
    color: @words;
    display: flex;
    justify-content: center;
    gap: 0.5em;
    user-select: none;

    a {
      text-align: center;
      padding: 10px 15px;
      border-radius: 10px;
      display: block;
      position: relative;
      cursor: pointer;

      &::after {
        content: '';
        width: 0%;
        border-bottom: 5px solid @primary;
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        transition: width 0.3s;
      }

      &:hover::after {
        width: 100%;
        left: 0;
      }
    }

    .curr {
      color: @primary;

      &::after {
        width: 100%;
        left: 0;
      }
    }

    .disabled {
      background: @gray;
      color: @lightWords;
      cursor: not-allowed;

      &:hover::after {
        width: 0;
      }
    }
  }
</style>
