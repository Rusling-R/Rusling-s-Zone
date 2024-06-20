<template>
  <li
    class="carouselitem-container"
    @mouseleave="recovery"
    @mousemove="offset">
    <ImgLoader
      :src="src"
      :placeholder="placeholder"
      @loaded="showTitle" />
    <div class="text">
      <h2
        :class="{ showing: titleShowing }"
        :style="{ width: `${titleWidth * wordWidth}em` }"
        ref="textTitle">
        {{ title }}
      </h2>
      <p
        :class="{ showing: descriptionShowing }"
        :style="{ width: `${descriptionWidth * wordWidth}em` }"
        ref="textDescription">
        {{ description }}
      </p>
    </div>
  </li>
</template>

<script>
  import ImgLoader from '@/components/ImgLoader';

  export default {
    name: 'CarouselItem',
    props: {
      src: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      },
      title: {
        type: String
      },
      description: {
        type: String
      }
    },
    data() {
      return {
        wordWidth: 1.5,
        titleWidth: 0,
        descriptionWidth: 0,
        titleShowing: true,
        descriptionShowing: false,
        intervalTimer: null,
        timeOutTimer: null,
        liRect: null
      };
    },
    computed: {
      liWidth() {
        return this.liRect.width || null;
      },
      liHeight() {
        return this.liRect.height || null;
      },
      liLeft() {
        return this.liRect.x || null;
      }
    },
    components: {
      ImgLoader
    },
    methods: {
      showTitle() {
        this.intervalTimer = setInterval(() => {
          if (this.titleWidth >= this.$refs.textTitle.innerText.length) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
            this.titleShowing = false;
            this.timeOutTimer = setTimeout(this.showDescription, 2000);
            return;
          }
          this.titleWidth += 1;
        }, 200);
      },
      showDescription() {
        this.descriptionShowing = true;
        this.intervalTimer = setInterval(() => {
          if (this.descriptionWidth >= this.$refs.textDescription.innerText.length) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
            return;
          }
          this.descriptionWidth += 1;
        }, 200);
      },
      offset(e) {
        let transX = (
          ((this.liWidth / 2 - (e.clientX - this.liLeft)) / (this.liWidth / 2)) *
          10
        ).toFixed(1);
        let transY = (((this.liHeight / 2 - e.clientY) / (this.liHeight / 2)) * 10).toFixed(1);

        this.$el.firstElementChild.style.transform = `translate(${transX}%, ${transY}%) scale(1.2)`;
      },
      recovery() {
        this.$el.firstElementChild.style.transform = '';
      }
    },
    mounted() {
      this.liRect = this.$el.getBoundingClientRect();
    },
    destroyed() {
      clearTimeout(this.timeOutTimer);
      clearInterval(this.intervalTimer);
    }
  };
</script>

<style lang="less" scoped>
  .carouselitem-container {
    height: 100%;
    overflow: hidden;
    position: relative;
    .imgLoader-container {
      transition: transform 0.3s ease-out;
    }
    .text {
      line-height: 2em;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
      left: 5%;
      top: 20%;
      cursor: default;

      h2 {
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 0.5em;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
      }

      p {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.5em;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
      }

      .showing::after {
        content: '';
        width: 0.1em;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.75);
        position: absolute;
        top: 0;
        right: 0;
        animation: flashing 1s linear infinite;
      }
    }
  }
  @keyframes flashing {
    0% {
      transform: scale(0);
    }
    33% {
      transform: scale(1);
    }
    66% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
