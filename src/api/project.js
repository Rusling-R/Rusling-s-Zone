import ins from './request';

/**
 * 请求所有项目信息
 * @returns {Promise} 数据为一个对象
 */
export async function getProject() {
  return await ins.get('/api/project');
}
