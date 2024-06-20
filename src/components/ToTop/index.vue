<template>
  <div
    class="toTop-container"
    @click="toTop">
    <Icon name="arrow-up" />
  </div>
</template>

<script>
  import Icon from '@/components/Icon';
  export default {
    name: 'ToTop',
    components: {
      Icon
    },
    methods: {
      toTop() {
        // 点击触发事件总线的toTop事件
        this.$eventListener.$emit('toTop');
      }
    }
  };
</script>

<style>
  .toTop-container {
    font-size: 15px;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 50px;
    right: 50px;
    cursor: pointer;
  }
</style>
