import { getAbout } from '@/api';

export default {
  namespaced: true,
  state: {
    isLoading: true,
    data: ''
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
      // 如果已经有数据就不再请求
      if (state.data) return;
      // 开始请求
      commit('setLoading', true);
      const resp = await getAbout();
      // 保存结果
      commit('setData', resp);
      // 结束请求
      commit('setLoading', false);
    }
  }
};
