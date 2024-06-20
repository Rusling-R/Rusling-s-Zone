/**
 * 用于Mixin的请求数据函数
 * @param {*} defaultData 返回的数据类型
 * @returns {Object} Vue配置对象
 */
export default function myFetch(defaultData = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultData
      };
    },
    async created() {
      if (this.fetchData) {
        this.data = await this.fetchData();
        this.isLoading = false;
      }
    }
  };
}
