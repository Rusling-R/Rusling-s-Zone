<template>
  <div class="notFound-container">
    <img :src="src" />
  </div>
</template>

<script>
  import notFound from '@/assets/error-404.png';
  export default {
    data() {
      return { src: notFound };
    }
  };
</script>

<style lang="less" scoped>
  .notFound-container {
    width: 100vw;
    height: 100vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
</style>
