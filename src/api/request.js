import axios from 'axios';
import popUp from '@/utils/popup';

// 设置最大响应时间为10s
const instance = axios.create({
  timeout: 10000
});

/**
 * 因为所有请求返回格式为{
 *  code: '0',
 *  msg: '',
 *  data: null
 * },
 * 配置相应拦截进行相应处理，无错误直接返回数据，有错误弹出消息
 */
instance.interceptors.response.use(function (response) {
  if (response.data.code === 0) {
    return response.data.data;
  } else {
    popUp(response.data.msg, 'warn');
    return null;
  }
});

export default instance;
