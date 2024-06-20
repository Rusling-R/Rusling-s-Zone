<template>
  <iconpark-icon
    :name="name"
    :size="size"
    class="icon-container"></iconpark-icon>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '2em'
      }
    }
  };
</script>

<style lang="less" scoped>
  .icon-container {
    text-align: center;
    height: 2em;
    display: block;
  }
</style>
