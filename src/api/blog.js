import ins from './request';

//  获取所有博客分类
export async function getAllBlogType() {
  return await ins.get('/api/blogtype');
}

/**
 * 分页获取博客
 * @param {Number} page 请求哪一页
 * @param {Number} limit 每页数据条数
 * @param {String} categoryId 分类ID
 * @returns {Promise} 数据为一个对象
 */
export async function getBlogList(page = 1, limit = 10, categoryId = -1) {
  return await ins.get('/api/blog', {
    params: {
      page,
      limit,
      categoryId
    }
  });
}

/**
 * 获取单个博客
 * @param {String} blogId 博客ID
 * @returns {Promise} 数据为一个对象
 */
export async function getBlogContent(blogId) {
  return await ins.get(`/api/blog/${blogId}`);
}

/**
 * 提交评论
 * @param {Object} body 一个包含昵称、内容、博客ID的对象
 * @returns {Promise} 数据为一个对象
 */
export async function comment(body) {
  return await ins.post('/api/comment', body);
}

/**
 * 分页获取博客
 * @param {Number} page 请求哪一页
 * @param {Number} limit 每页数据条数
 * @param {String} blogid 分类ID
 * @returns {Promise} 数据为一个对象
 */
export async function getComment(page = 1, limit = 10, blogid = -1) {
  return await ins.get('/api/comment', {
    params: {
      page,
      limit,
      blogid
    }
  });
}
