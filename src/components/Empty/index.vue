<template>
  <div class="empty-container">
    <Icon
      name="file-failed-one"
      size="50px" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
  import Icon from '@/components/Icon';
  export default {
    name: 'Empty',
    props: {
      text: {
        type: String,
        default: '暂无数据'
      }
    },
    components: {
      Icon
    }
  };
</script>

<style lang="less" scoped>
  .empty-container {
    width: 100%;
    height: 100%;
    min-height: 500px;
    color: #b4b9bb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
</style>
