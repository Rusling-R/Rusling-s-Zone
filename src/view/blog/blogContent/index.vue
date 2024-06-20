<template>
  <LayOut>
    <template v-slot>
      <div
        ref="container"
        v-loading="isLoading"
        @scroll="scanHandler"
        class="blogContent-container">
        <Content
          v-if="data"
          :blogTitle="data.title"
          :category="data.category.name"
          :scanNumber="data.scanNumber"
          :commentNumber="data.commentNumber"
          :innerHTML="data.htmlContent" />
        <Comment v-if="data" />
      </div>
    </template>
    <template v-slot:right>
      <ContentToc
        v-if="data"
        :title="data.title"
        :tocList="tocList" />
    </template>
  </LayOut>
</template>

<script>
  import { getBlogContent } from '@/api';
  import { myFetch, formatDate, debounce, toTop } from '@/utils';
  import LayOut from '@/components/Layout';
  import Comment from '@/components/Comment';
  import Content from './Content';
  import ContentToc from './contentToc';

  export default {
    name: 'BlogContent',
    mixins: [myFetch(), toTop('container')],
    components: {
      LayOut,
      Content,
      ContentToc,
      Comment
    },
    data() {
      return {
        currAnchor: ''
      };
    },
    computed: {
      anchorDoms() {
        // 获取锚点doms
        const doms = [];
        const addDoms = i => {
          for (const item of i) {
            doms.push(document.getElementById(item.anchor));
            if (item.children) addDoms(item.children);
          }
        };
        if (!this.data) return [];
        addDoms(this.data.toc);
        return doms;
      },
      tocList() {
        const temp = i => {
          return {
            isSelected: this.currAnchor === i.anchor,
            name: i.name,
            anchor: i.anchor,
            children: i.children ? i.children.map(temp) : []
          };
        };
        if (!this.data) return;
        return this.data.toc.map(temp);
      }
    },
    methods: {
      async fetchData() {
        return await getBlogContent(this.$route.params.blogId);
      },
      formatDate,
      setCurrAnchorTemp() {
        // 配置范围
        const rangeDis = 200;
        for (const i of this.anchorDoms) {
          if (!i) {
            continue;
          }
          const dis = i.getBoundingClientRect().top;
          // 计算浏览到文章哪一部分，设置锚点
          if (dis < rangeDis) {
            this.currAnchor = i.id;
          } else {
            continue;
          }
        }
      },
      scanHandler() {
        // 触发浏览事件，将DOM作为数据传入处理函数
        this.$eventListener.$emit('scan', this.$refs.container);
      }
    },
    mounted() {
      this.setCurrAnchor = debounce(this.setCurrAnchorTemp);
      this.$eventListener.$on('scan', this.setCurrAnchor);
    },
    beforeDestroy() {
      this.$eventListener.$off('scan', this.setCurrAnchor);
    }
  };
</script>

<style lang="less" scoped>
  .blogContent-container {
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    position: relative;
  }
</style>
