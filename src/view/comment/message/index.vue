<template>
  <div class="comment-container">
    <form @submit.prevent="postMessage">
      <div class="form-item">
        <input
          v-model="nickname"
          type="text"
          maxlength="10"
          placeholder="请填写昵称" />
        <span class="limit">{{ nickname.length }}/10</span>
        <p class="error-msg">{{ errorMsg.nickname }}</p>
      </div>
      <div class="form-item">
        <textarea
          v-model="commentText"
          rows="10"
          cols="60"
          maxlength="300"
          placeholder="请填写内容"></textarea>
        <span class="limit">{{ commentText.length }}/300</span>
        <p class="error-msg">{{ errorMsg.commentText }}</p>
      </div>
      <div class="form-item">
        <button
          type="submit"
          :disabled="isSubmitting">
          {{ isSubmitting ? '正在提交' : '提交' }}
        </button>
      </div>
    </form>
    <div
      v-if="data"
      class="commentList-container">
      <h3>
        {{ title }}
        <span>({{ data.total }})</span>
      </h3>
      <Empty v-if="!isLoading && data.rows.length === 0" />
      <ul class="comment-list">
        <li
          v-for="item in data.rows"
          :key="item.id">
          <Avatar :src="item.avatar" />
          <div class="info">
            <h4>{{ item.nickname }}</h4>
            <p>{{ item.content }}</p>
            <p class="time">{{ formatDate(+item.createDate, true) }}</p>
          </div>
        </li>
      </ul>
      <div
        v-loading="isLoading2"
        class="loading"></div>
    </div>
  </div>
</template>

<script>
  import { getMessage, message } from '@/api';
  import { myFetch, formatDate, debounce } from '@/utils';
  import Avatar from '@/components/Avatar';
  import Empty from '@/components/Empty';

  export default {
    name: 'Message',
    mixins: [myFetch({ total: 0, rows: [] })],
    props: {
      title: {
        type: String,
        default: '评论区'
      }
    },
    components: {
      Avatar,
      Empty
    },
    data() {
      return {
        nickname: '',
        commentText: '',
        errorMsg: {
          nickname: '',
          commentText: ''
        },
        isSubmitting: false,
        page: 1,
        isLoading2: false
      };
    },
    methods: {
      async fetchData() {
        return await getMessage(this.page, 10);
      },
      formatDate,
      async postMessage() {
        // 判断是否正在请求中
        if (this.isSubmitting) return;
        // 表单验证
        if (!this.nickname) {
          this.errorMsg.nickname = '昵称不能为空';
        } else {
          this.errorMsg.nickname = '';
        }
        if (!this.commentText) {
          this.errorMsg.commentText = '评论不能为空';
        } else {
          this.errorMsg.commentText = '';
        }
        // 有空就返回
        if (!this.nickname || !this.commentText) return;

        // 开始请求
        this.isSubmitting = true;
        const res = await message({
          nickname: this.nickname,
          commentText: this.commentText
        });
        // 更新数据
        this.data.rows.unshift(res);
        this.data.total++;
        // 重置表单
        this.nickname = '';
        this.commentText = '';
        // 结束请求
        this.isSubmitting = false;
        // 给出提示
        this.$popUp('评论成功');
      },
      async loadMore(dom) {
        // 判断是否可以加载更多
        if (!dom) return;
        if (this.isLoading2 || this.data.rows.length >= this.data.total) return;
        // 设置判断范围
        const range = 100;
        if (dom.scrollHeight - dom.scrollTop - dom.clientHeight < range) {
          // 开始请求
          this.isLoading2 = true;
          // 设置参数
          this.page++;
          const res = await this.fetchData();
          // 结束请求
          this.isLoading2 = false;
          // 更新数据
          this.data.total = res.total;
          this.data.rows = this.data.rows.concat(res.rows);
        }
      }
    },
    mounted() {
      // 函数防抖
      this.loadMoreMessage = debounce(this.loadMore);
      this.$eventListener.$on('scan', this.loadMoreMessage);
    },
    destroyed() {
      // 销毁组件时取消监听
      this.$eventListener.$off('scan', this.loadMoreMessage);
    }
  };
</script>

<style lang="less" scoped>
  .comment-container {
    padding: 0 40px;
    margin-bottom: 40px;

    .form-item {
      width: fit-content;
      margin: 20px 0;
      overflow: hidden;
      position: relative;

      input {
        color: #ddd;
        padding: 0.5em 1em;
        border: 1px dashed #a8a8a8;
        border-radius: 5px;
        outline: none;
        background: transparent;
        display: block;
        &:focus {
          border: 1px solid #75afed;
        }
      }

      textarea {
        color: #ddd;
        padding: 0.5em 1em;
        border: 1px dashed #a8a8a8;
        border-radius: 5px;
        outline: none;
        background: transparent;
        display: block;
        resize: none;
        &:focus {
          border: 1px solid #75afed;
        }
      }

      button[type='submit'] {
        padding: 0.5em 1.5em;
        border: none;
        border-radius: 5px;
        background-color: #75afed;
        cursor: pointer;

        &:disabled {
          background-color: #a2b5ca;
          cursor: not-allowed;
        }
      }

      .limit {
        position: absolute;
        right: 0.5em;
        bottom: 1.5em;
      }

      .error-msg {
        line-height: 1.5em;
        color: red;
        height: 1.5em;
      }
    }

    .commentList-container {
      h3 {
        font-size: 20px;
        margin-bottom: 1em;
      }
      .comment-list {
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
          padding: 2em;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          gap: 2em;
          align-items: center;

          .info {
            flex: 1 1 auto;
            h4 {
              margin: 1em 0;
            }
            p {
              margin: 1em 0;
            }
            .time {
              text-align: right;
            }
          }
        }
      }

      .loading {
        height: 50px;
        position: relative;
      }
    }
  }
</style>
