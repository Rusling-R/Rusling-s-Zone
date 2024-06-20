<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="mid">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
  };
</script>

<style lang="less" scoped>
  .layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      flex: 0 0 auto;
      overflow: hidden;
    }

    .mid {
      flex: 1 1 auto;
      overflow: hidden;
    }
  }
</style>
