import Vue from 'vue';
import Vuex from 'vuex';
import setting from './setting';
import banner from './banner';
import about from './about';

Vue.use(Vuex);

// 导出仓库
export default new Vuex.Store({
  modules: {
    setting,
    banner,
    about
  },
  // 在开发阶段使用严格模式
  strict: process.env.NODE_ENV !== 'production'
});
