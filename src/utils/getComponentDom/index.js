import Vue from 'vue';

/**
 * 得到一个Vue组件的根Dom
 * @param {Object} VueExample Vue实例
 * @param {*} props 要传入的属性
 * @returns {Object} 该组件的根Dom
 */
export default function getComponentRootDom(VueExample, props) {
  const vm = new Vue({
    render: h => h(VueExample, { props })
  });
  vm.$mount();
  return vm.$el;
}
