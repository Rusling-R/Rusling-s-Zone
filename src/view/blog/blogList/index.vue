<template>
  <Layout>
    <template v-slot>
      <BlogList />
    </template>
    <template v-slot:right>
      <CategoryToc />
    </template>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import BlogList from './blogList';
  import CategoryToc from './categoryToc';
  export default {
    components: {
      Layout,
      BlogList,
      CategoryToc
    }
  };
</script>

<style></style>
