<template>
  <img
    :src="src"
    :style="{ width: size, height: size }"
    class="avatar-container" />
</template>

<script>
  export default {
    name: 'Avatar',
    props: {
      src: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '50px'
      }
    }
  };
</script>

<style lang="css" scoped>
  .avatar-container {
    border-radius: 50%;
    display: block;
  }
</style>
