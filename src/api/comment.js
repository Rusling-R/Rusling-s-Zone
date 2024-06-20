import ins from './request';

/**
 * 提交留言
 * @param {Object} body 一个包含昵称和内容的对象
 * @returns {Promise} 数据为一个对象
 */
export async function message(body) {
  return await ins.post('/api/message', body);
}

/**
 * 分页获取留言
 * @param {Number} page 请求哪一页
 * @param {Number} limit 每页的数据条数
 * @returns  {Promise} 数据为一个对象
 */
export async function getMessage(page, limit) {
  return await ins.get('/api/message', {
    params: {
      page,
      limit
    }
  });
}
