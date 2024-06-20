import { getSetting } from '@/api';

export default {
  namespaced: true,
  state: {
    isLoading: true,
    data: {}
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchData({ state, commit }) {
      // 判断是否已有数据，避免重复请求
      if (Object.keys(state.data).length) return;
      // 开始请求
      commit('setLoading', true);
      const resp = await getSetting();
      // 保存结果
      commit('setData', resp);
      // 结束请求
      commit('setLoading', false);
      // 查看是否有图标
      if (document.head.querySelector('link[rel="shortcut icon"]')) return;
      // 根据数据加载网站图标
      const iconElement = document.createElement('link');
      iconElement.rel = 'shortcut icon';
      iconElement.type = 'image/x-icon';
      iconElement.href = resp.favicon;
      document.head.appendChild(iconElement);
      // 根据数据加载网站标题
      const titleTemp = document.title.split('-')[0];
      if (titleTemp) {
        document.title = `${titleTemp}-${resp.siteTitle}`;
      } else {
        document.title = resp.siteTitle;
      }
    }
  }
};
