<template>
  <div
    class="siteside-container"
    v-loading="isLoading">
    <div>
      <Avatar
        :src="data.avatar || ''"
        size="100px" />
      <h1 class="web-title">{{ data.siteTitle }}</h1>
    </div>
    <Nav />
    <Contact />
    <p class="icp">
      <a
        href="https://beian.miit.gov.cn"
        target="_blank">
        {{ data.icp }}
      </a>
    </p>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar';
  import Nav from '@/components/SiteSide/Nav';
  import Contact from '@/components/SiteSide/Contact';
  import { mapState } from 'vuex';

  export default {
    name: 'SiteSide',
    components: {
      Avatar,
      Nav,
      Contact
    },
    computed: {
      ...mapState('setting', ['data', 'isLoading'])
    }
  };
</script>

<style lang="less" scoped>
  @import '~@/styles/var.less';
  .siteside-container {
    width: 100%;
    height: 100%;
    padding: 50px 0;
    background-color: #2d333b;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    position: relative;

    .nav-container {
      flex: 2 2 auto;
    }

    .contact-container {
      flex: 1 1 auto;
    }

    .web-title {
      text-align: center;
      margin-top: 1em;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      border-radius: 2px;
      background-color: rgba(240, 240, 240, 0.7);
    }

    .icp {
      a:hover {
        color: @lightWords;
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
</style>
