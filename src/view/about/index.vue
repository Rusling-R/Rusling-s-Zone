<template>
  <div
    class="about-container"
    v-loading="isLoading || !isFinsh">
    <iframe
      :src="data"
      @load="finsh"></iframe>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'About',
    data() {
      return {
        isFinsh: false
      };
    },
    computed: {
      ...mapState('about', ['data', 'isLoading'])
    },
    methods: {
      finsh() {
        // 在数据加载完成后显示
        this.isFinsh = true;
      }
    },
    created() {
      // 加载数据
      this.$store.dispatch('about/fetchData');
    }
  };
</script>

<style lang="less" scoped>
  .about-container {
    width: 100%;
    height: 100%;
    position: relative;
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
  }
</style>
