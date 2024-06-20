<template>
  <div class="contact-container">
    <a :href="`mailto:${data.mail}`">
      <Icon
        name="mail"
        :size="size" />
      <span>{{ data.mail }}</span>
    </a>
    <a
      :href="data.github"
      target="_blank">
      <Icon
        name="github"
        :size="size" />
      <span>{{ data.githubName }}</span>
    </a>
    <a
      :href="`https://wx.qq.com/`"
      target="_blank"
      class="wechat">
      <Icon
        name="wechat"
        :size="size" />
      <span>{{ data.weixin }}</span>
      <div class="qrcode">
        <img :src="data.weixinQrCode" />
      </div>
    </a>
    <a
      href="javascript:void(0)"
      class="qq">
      <Icon
        name="tencent-qq"
        :size="size" />
      <span>{{ data.qq }}</span>
      <div class="qrcode">
        <img :src="data.qqQrCode" />
      </div>
    </a>
  </div>
</template>

<script>
  import Icon from '@/components/Icon';
  import { mapState } from 'vuex';
  export default {
    name: 'Contact',
    props: {
      size: {
        type: String,
        default: '30px'
      }
    },
    components: {
      Icon
    },
    computed: {
      ...mapState('setting', ['data'])
    }
  };
</script>

<style lang="less" scoped>
  @import '~@/styles/var.less';
  .contact-container {
    width: 100%;
    min-width: 257px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;

    a {
      padding: 0 2em;
      display: flex;
      align-items: center;
      gap: 1em;
      position: relative;

      &:hover {
        color: @lightWords;
      }
    }
    .wechat,
    .qq {
      .qrcode {
        box-sizing: border-box;
        width: 130px;
        height: 130px;
        border-radius: 5px;
        position: absolute;
        bottom: 100%;
        left: 50%;
        z-index: 1;
        transform-origin: center bottom;
        transform: translateX(-50%) scale(0);
        transition: all 0.3s linear;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
    }
    .wechat:hover .qrcode,
    .qq:hover .qrcode {
      transform: translateX(-50%) scale(1);
    }
  }
</style>
