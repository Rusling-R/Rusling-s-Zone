import ins from './request';

/**
 * 请求首页展示大图的信息
 * @returns {Promise} 数据为一个对象
 */
export async function getBanner() {
  return await ins.get('/api/banner');
}
