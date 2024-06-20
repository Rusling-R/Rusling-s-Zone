import ins from './request';

/**
 * 获取关于我的链接信息
 * @returns {Promise} 数据为一个对象
 */
export async function getAbout() {
  return await ins.get('/api/about');
}
