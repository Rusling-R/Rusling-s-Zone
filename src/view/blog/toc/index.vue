<template>
  <ul class="toc-container">
    <li
      v-for="(item, index) in dataList"
      :key="index"
      :class="{ selected: item.isSelected }">
      <a @click.prevent="navigate(item)">
        {{ item.name }}
        <span v-if="item.aside">{{ `(${item.aside}篇)` }}</span>
      </a>
      <Toc
        v-if="item.children"
        :dataList="item.children"
        style="font-size: inherit"
        @navigate="navigate" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Toc',
    props: {
      dataList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      navigate(itemData) {
        if (!itemData.isSelected) {
          this.$emit('navigate', itemData);
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .toc-container {
    font-size: 16px;
    line-height: 32px;
    width: 100%;
    min-width: 180px;
    height: 100%;
    padding: 20px 0 20px 20px;
    background-color: #2d333b;

    ul {
      color: #aaa;
      padding: 0 0 0 20px;
    }

    li {
      font-size: 1em;
      cursor: pointer;

      a {
        font-size: 0.8em;
      }
    }

    .selected {
      color: #0dbc79;
    }
  }
</style>
