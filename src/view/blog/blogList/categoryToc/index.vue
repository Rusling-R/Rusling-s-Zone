<template>
  <div class="categoryToc-container">
    <Toc
      :dataList="typeList"
      @navigate="navigator" />
  </div>
</template>

<script>
  import { getAllBlogType } from '@/api';
  import { myFetch } from '@/utils';
  import Toc from '@/view/blog/toc';

  export default {
    name: 'CategoryToc',
    mixins: [myFetch([])],
    components: { Toc },
    computed: {
      routeInfo() {
        return {
          categoryId: this.$route.params.categoryId || -1,
          page: +this.$route.query.page || 1,
          limit: +this.$route.query.limit || 10
        };
      },
      typeList() {
        if (this.data.length === 0) return [];
        const allType = {
          id: -1,
          name: '全部分类',
          isSelected: -1 === this.routeInfo.categoryId,
          aside: this.data.reduce((a, b) => a + b.articleCount, 0),
          order: 0
        };
        const typeListTemp = this.data.map(i => {
          return {
            isSelected: i.id === this.routeInfo.categoryId,
            aside: i.articleCount,
            ...i
          };
        });
        typeListTemp.unshift(allType);
        return typeListTemp;
      }
    },
    methods: {
      fetchData: getAllBlogType,
      navigator(cate) {
        if (cate.id === -1) {
          this.$router.push({ name: 'blog' });
        } else {
          this.$router.push({
            name: 'categoryBlog',
            params: {
              categoryId: cate.id
            }
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .categoryToc-container {
    width: 200px;
    height: 100%;
    overflow: auto;
  }
</style>
