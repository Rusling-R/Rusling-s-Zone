// import './mock';
import Vue from 'vue';
import { loading } from '@/utils';
import { lazy } from '@/utils';
import { popUp } from '@/utils';
import App from './App.vue';
import store from './store';
import router from './router';
import $eventListener from './eventListener';
store.dispatch('setting/fetchData');

Vue.config.productionTip = false;
Vue.prototype.$eventListener = $eventListener;
Vue.prototype.$popUp = popUp;
Vue.directive('loading', loading);
Vue.directive('lazy', lazy);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
