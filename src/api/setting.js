import ins from './request';

/**
 * 请求全局信息
 * @returns {Promise} 数据为一个对象
 */
export async function getSetting() {
  return await ins.get('/api/setting');
}
