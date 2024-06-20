import { getBanner } from '@/api';

export default {
  namespaced: true,
  state: {
    isLoading: true,
    data: []
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
      // 判断是否已有数据
      if (state.data.length) return;
      commit('setLoading', true);
      const resp = await getBanner();
      commit('setData', resp);
      commit('setLoading', false);
    }
  }
};
