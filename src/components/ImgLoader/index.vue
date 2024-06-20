<template>
  <div class="imgLoader-container">
    <img
      :src="src"
      @load="trans" />
    <img
      v-if="mask"
      class="mask"
      :src="placeholder"
      :style="{ 'transition-duration': transitionDuration, opacity: maskOpacity }"
      @transitionend="removeMask" />
  </div>
</template>

<script>
  export default {
    name: 'ImgLoader',
    props: {
      placeholder: {
        type: String,
        required: true
      },
      src: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        mask: true,
        maskOpacity: 1,
        transitionDuration: `${this.duration}ms`
      };
    },
    methods: {
      trans() {
        // 平滑显示原图
        this.maskOpacity = 0;
      },
      removeMask() {
        // 移除缩略图遮罩
        this.mask = false;
        this.$emit('loaded');
      }
    }
  };
</script>

<style lang="less" scoped>
  .imgLoader-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .mask {
      filter: blur(40px);
      transition-property: opacity;
      transition-timing-function: ease-in-out;
    }
  }
</style>
