<template>
  <div
    class="blogList-container"
    v-loading="isLoading">
    <Empty v-if="!isLoading && data.total === 0" />
    <ul v-if="data.total">
      <li
        v-for="item in data.rows"
        :key="item.id">
        <div
          v-if="item.thumb"
          class="thumb">
          <router-link :to="{ name: 'blogContent', params: { blogId: item.id } }">
            <img
              v-if="item.thumb"
              v-lazy="item.thumb"
              :src="imgPlace"
              :alt="item.title"
              :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link :to="{ name: 'blogContent', params: { blogId: item.id } }">
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <router-link :to="{ name: 'categoryBlog', params: { categoryId: item.category.id } }">
              {{ item.category.name }}
            </router-link>
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <PageList
      v-if="data.total"
      :total="data.total"
      :curr="routeInfo.page"
      :limits="routeInfo.limit"
      @pageChange="turnPage" />
  </div>
</template>

<script>
  import imgPlace from '@/assets/loading.svg';
  import { getBlogList } from '@/api';
  import { myFetch, formatDate, toTop } from '@/utils';
  import PageList from '@/components/PageList';
  import Empty from '@/components/Empty';

  export default {
    name: 'BlogList',
    mixins: [myFetch({}), toTop()],
    components: { PageList, Empty },
    data() {
      return { imgPlace };
    },
    computed: {
      routeInfo() {
        return {
          page: +this.$route.query.page || 1,
          limit: +this.$route.query.limit || 10,
          categoryId: this.$route.params.categoryId || -1
        };
      }
    },
    methods: {
      fetchData: async function () {
        return await getBlogList(
          this.routeInfo.page,
          this.routeInfo.limit,
          this.routeInfo.categoryId
        );
      },
      formatDate,
      turnPage(page) {
        if (this.routeInfo.categoryId === -1) {
          this.$router.push({
            name: 'blog',
            query: {
              page,
              limit: this.routeInfo.limit
            }
          });
        } else {
          this.$router.push({
            name: 'categoryBlog',
            params: { categoryId: this.routeInfo.categoryId },
            query: {
              page,
              limit: this.routeInfo.limit
            }
          });
        }
      }
    },
    watch: {
      $route: {
        async handler() {
          // 路由变化时返回顶部
          this.isLoading = true;
          this.$el.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
          this.$el.clientHeight;
          this.$el.style.overflow = 'hidden';
          this.data = await this.fetchData();
          this.isLoading = false;
          this.$el.style.overflow = 'auto';
        },
        deep: true
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '~@/styles/var.less';
  .blogList-container {
    line-height: 1.7;
    position: relative;
    padding: 20px;
    overflow: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .pageList-container {
      margin-top: 50px;
    }

    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid @gray;
      .thumb {
        flex: 0 0 auto;
        margin-right: 15px;
        cursor: pointer;
        img {
          display: block;
          max-width: 240px;
          min-height: 150px;
          border-radius: 5px;
        }
      }
      .main {
        flex: 1 1 auto;
        h2 {
          font-size: 24px;
          margin: 0;
        }
      }
      .aside {
        font-size: 12px;
        color: @gray;
        span {
          margin-right: 15px;
        }
      }
      .desc {
        margin: 15px 0;
        font-size: 14px;
      }
    }
  }
</style>
