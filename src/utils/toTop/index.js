/**
 * 用于Mixin的返回顶部函数
 * @param {String} refName 在组件中引用的Dom名称
 * @returns {Object} Vue配置对象
 */
export default function (refName) {
  return {
    methods: {
      showToTopBtn() {
        this.$eventListener.$emit('scan', this.$refs[refName] || this.$el);
      },
      scrollToTop() {
        (this.$refs[refName] || this.$el).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    },
    mounted() {
      (this.$refs[refName] || this.$el).addEventListener('scroll', this.showToTopBtn);
      this.$eventListener.$on('toTop', this.scrollToTop);
    },
    beforeDestroy() {
      this.$eventListener.$emit('scan', null);
      (this.$refs[refName] || this.$el).removeEventListener('scroll', this.showToTopBtn);
      this.$eventListener.$off('toTop', this.toTop);
    }
  };
}
