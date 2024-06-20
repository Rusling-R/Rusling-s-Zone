import Mock from 'mockjs';

Mock.mock('/api/message', 'post', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    nickname: '@cname',
    content: '@cparagraph(5, 10)',
    createDate: '@date("T")',
    avatar: '@image("100x100", "#894FC4", "#FFF", "png", "!!!")'
  }
});

Mock.mock(/^\/api\/message\?(.+)$/, 'get', {
  code: 0,
  msg: '',
  data: {
    total: 50,
    'rows|10': [
      {
        id: '@guid',
        nickname: '@cname',
        content: '@cparagraph(5, 10)',
        createDate: '@date("T")',
        avatar: '@image("100x100", "#894FC4", "#FFF", "png", "!!!")'
      }
    ]
  }
});
