<template>
  <div
    ref="messageContainer"
    class="message-container"
    @scroll="$eventListener.$emit('scan', $el)">
    <Message />
  </div>
</template>

<script>
  import Message from './message';
  import { toTop } from '@/utils';

  export default {
    mixins: [toTop('messageContainer')],
    components: {
      Message
    }
  };
</script>

<style lang="less">
  .message-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
