<template>
  <nav class="nav-container">
    <RouterLink
      v-for="(i, k) in navList"
      :key="i.link"
      :to="{ name: i.route }"
      :exact="i.exact"
      active-class="selected">
      <Icon
        :name="k"
        :size="size" />
      <span>{{ i.text }}</span>
    </RouterLink>
  </nav>
</template>

<script>
  import Icon from '@/components/Icon';

  export default {
    name: 'Nav',
    props: {
      size: {
        type: String,
        default: '30px'
      }
    },
    data() {
      return {
        navList: {
          home: { text: '首页', route: 'home', exact: true },
          'doc-detail': {
            text: '文章',
            route: 'blog',
            exact: false
          },
          'html-five': {
            text: '项目&效果',
            route: 'project',
            exact: true
          },
          comment: {
            text: '评论区',
            route: 'comment',
            exact: true
          },
          avatar: {
            text: '关于我',
            route: 'about',
            exact: true
          }
        }
      };
    },
    components: { Icon }
  };
</script>

<style lang="less" scoped>
  @import '~@/styles/var.less';
  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    a {
      padding: 0.5em 2em;
      display: flex;
      align-items: center;
      gap: 1em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        color: @lightWords;
        background-color: rgba(255, 255, 255, 0.4);
      }

      &.selected {
        color: @lightWords;
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
</style>
