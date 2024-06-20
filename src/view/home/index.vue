<template>
  <div
    class="home-container"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
    @wheel="wheelHandler"
    v-loading="isLoading">
    <ul
      class="carousel-container"
      :style="{ transform: `translateY(${transDis}%)`, transition: transitionData }"
      ref="carousel">
      <CarouselItem
        v-for="item in data"
        :key="item.id"
        :src="item.bigImg"
        :placeholder="item.midImg"
        :title="item.title"
        :description="item.description" />
    </ul>
    <div
      class="before"
      @click="switchTo(-1)">
      <Icon name="up" />
    </div>
    <div
      class="next"
      @click="switchTo(1)">
      <Icon name="down" />
    </div>
    <div class="list">
      <div
        v-for="(item, index) in data"
        :key="item.id"
        class="dot"
        :class="{ selected: curr === index + 1 }"></div>
    </div>
  </div>
</template>

<script>
  import Icon from '@/components/Icon';
  import CarouselItem from './CarouselItem.vue';
  import { mapState } from 'vuex';

  export default {
    name: 'Home',
    components: {
      Icon,
      CarouselItem
    },
    data() {
      return {
        curr: 1,
        transDis: -100,
        transitionData: 'none',
        switching: false,
        timer: null
      };
    },
    computed: {
      ...mapState('banner', ['data', 'isLoading'])
    },
    methods: {
      switchTo(axis) {
        if (this.switching) return;
        this.switching = true;
        this.curr += axis;
        if (this.curr > this.data.length) {
          this.curr = 1;
        }
        if (this.curr < 1) {
          this.curr = this.data.length;
        }
        this.transitionData = 'transform 0.4s ease-in-out';
        if (axis === 1) {
          this.transDis = -200;
          this.$refs.carousel.addEventListener('transitionend', this.afterScroll);
        } else {
          this.transDis = 0;
          this.$refs.carousel.addEventListener('transitionend', this.beforeScroll);
        }
      },
      afterScroll() {
        this.transitionData = 'none';
        if (this.$refs.carousel.firstElementChild)
          this.$refs.carousel.appendChild(this.$refs.carousel.firstElementChild);
        this.transDis = -100;
        this.$refs.carousel.removeEventListener('transitionend', this.afterScroll);
        this.switching = false;
      },
      beforeScroll() {
        this.transitionData = 'none';
        this.$refs.carousel.insertBefore(
          this.$refs.carousel.lastElementChild,
          this.$refs.carousel.firstElementChild
        );
        this.transDis = -100;
        this.$refs.carousel.removeEventListener('transitionend', this.beforeScroll);
        this.switching = false;
      },
      clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
      },
      startTimer() {
        if (!this.timer) this.timer = setInterval(() => this.switchTo(1), 10000);
      },
      wheelHandler(e) {
        if (this.switching) return;
        if (Math.abs(e.deltaY) < 100) return;
        e.deltaY > 0 ? this.switchTo(1) : this.switchTo(-1);
      }
    },
    created() {
      this.$store.dispatch('banner/fetchData');
    },
    mounted() {
      this.timer = setInterval(() => this.switchTo(1), 10000);
    },
    destroyed() {
      this.clearTimer();
    }
  };
</script>

<style lang="less" scoped>
  .home-container {
    font-size: 24px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .carousel-container {
      height: 100%;
      overflow: visible;
      transform: translateY(-100%);
    }

    .before {
      padding-top: 0.5em;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -0.5em);
      animation: before 1s ease-in-out infinite;
      cursor: pointer;
    }

    .next {
      padding-bottom: 0.5em;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0.5em);
      animation: next 1s ease-in-out infinite;
      cursor: pointer;
    }

    .list {
      font-size: 15px;
      padding: 0.5em;
      display: flex;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;

      .dot {
        width: 12px;
        height: 12px;
        border: 2px solid #ccc;
        border-radius: 50%;
        background-color: #000;
        cursor: pointer;
        &.selected {
          background-color: #fff;
        }
      }
    }
  }

  @keyframes before {
    0% {
      transform: translate(-50%, -0.5em);
    }
    50% {
      transform: translate(-50%, 0em);
    }
    100% {
      transform: translate(-50%, -0.5em);
    }
  }
  @keyframes next {
    0% {
      transform: translate(-50%, 0.5em);
    }
    50% {
      transform: translate(-50%, 0em);
    }
    100% {
      transform: translate(-50%, 0.5em);
    }
  }
</style>
