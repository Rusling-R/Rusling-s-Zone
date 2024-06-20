<template>
  <div style="width: 100vw; height: 100vh; background: #222">
    <Layout>
      <template
        v-slot:left
        v-if="$route.name !== '404'">
        <SiteSide />
      </template>
      <template v-slot>
        <RouterView />
      </template>
    </Layout>
    <ToTop v-if="isShow" />
  </div>
</template>

<script>
  import '@/styles/global.less';
  import SiteSide from '@/components/SiteSide';
  import Layout from '@/components/Layout';
  import ToTop from '@/components/ToTop';

  export default {
    name: 'App',
    components: {
      SiteSide,
      Layout,
      ToTop
    },
    data() {
      return {
        isShow: false
      };
    },
    computed: {
      viewHeight() {
        return document.documentElement.clientHeight;
      }
    },
    methods: {
      show(dom) {
        // 根据滚动距离判断是否显示返回顶部按钮
        if (!dom || dom.scrollTop <= this.viewHeight) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      }
    },
    created() {
      // 在事件总线上监听浏览事件
      this.$eventListener.$on('scan', this.show);
    }
  };
</script>

<style scoped></style>
