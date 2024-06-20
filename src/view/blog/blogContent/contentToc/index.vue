<template>
  <div class="contentToc-container">
    <p class="title">{{ title }}</p>
    <Toc
      :dataList="tocList"
      @navigate="nav" />
  </div>
</template>

<script>
  import Toc from '@/view/blog/toc';

  export default {
    name: 'ContentToc',
    props: {
      tocList: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: '目录'
      }
    },
    components: { Toc },
    methods: {
      nav(itemData) {
        window.location.hash = itemData.anchor;
      }
    }
  };
</script>

<style lang="less" scoped>
  .contentToc-container {
    width: 200px;
    height: 100%;
    overflow: hidden auto;
  }
  .title {
    font-size: 18px;
    color: #fff;
    width: 100%;
    padding: 20px 0 0 20px;
    white-space: nowrap;
    background: #2d333b;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
