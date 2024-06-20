<template>
  <ul
    class="project-container"
    v-loading="isLoading">
    <li
      v-for="item in data"
      :key="item.id">
      <img
        v-if="item.thumb"
        v-lazy="item.thumb"
        :src="imgPlace"
        :alt="item.name" />
      <div class="info">
        <h2>
          <a
            :href="item.url"
            target="_blank">
            {{ item.name }}
          </a>
          <a
            v-if="item.github"
            :href="item.github"
            class="git"
            target="_blank">
            GitHub
          </a>
        </h2>
        <p
          v-for="(i, index) in item.description"
          :key="index">
          {{ i }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
  import imgPlace from '@/assets/loading.svg';
  import { getProject } from '@/api';
  import { myFetch, toTop } from '@/utils';

  export default {
    mixins: [myFetch([]), toTop()],
    data() {
      return { imgPlace };
    },
    methods: {
      fetchData: getProject
    }
  };
</script>

<style lang="less" scoped>
  .project-container {
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;
    position: relative;

    li {
      font-size: 18px;
      padding: 1em;
      border: 1px solid #848484;
      border-radius: 5px;
      display: flex;
      gap: 1.5em;
      transition: transform 0.3s;

      img {
        object-fit: cover;
        max-width: 300px;
        min-height: 150px;
        border-radius: 5px;
        display: block;
      }

      .info {
        font-size: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        h2 {
          font-size: 24px;
          color: #358cd6;
          width: fit-content;
          display: flex;
          align-items: flex-end;
          gap: 1em;

          .git {
            font-size: 18px;
          }

          a:hover {
            color: #9cdcfe;
            text-decoration: underline;
          }
        }

        p {
          padding: 0.25em 0;
        }
      }

      &:hover {
        transform: scale(1.05);
      }
    }
  }
</style>
