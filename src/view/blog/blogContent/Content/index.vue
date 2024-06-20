<template>
  <article class="content-container">
    <h2>{{ blogTitle }}</h2>
    <aside>
      <a href="">类别：{{ category }}</a>
      <a href="">浏览数：{{ scanNumber }}</a>
      <a href="#comment">评论数：{{ commentNumber }}</a>
    </aside>
    <div
      v-html="innerHTML"
      class="markdown-body"
      style="color: #ddd"></div>
  </article>
</template>

<script>
  export default {
    name: 'Content',
    props: {
      blogTitle: { type: String },
      category: { type: String },
      scanNumber: { type: Number },
      commentNumber: { type: Number },
      innerHTML: { type: String }
    }
  };
</script>

<style lang="less" scoped>
  @import '@/styles/markdown.css';
  .content-container {
    width: 100%;
    padding: 40px;

    h2 {
      font-size: 28px;
      line-height: 1em;
      margin: 1em 0;
    }

    aside {
      font-size: 16px;
      margin: 0 0 2em 0;
      display: flex;
      gap: 2em;
    }
  }
</style>
