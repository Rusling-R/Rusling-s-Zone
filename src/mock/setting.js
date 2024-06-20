import Mock from 'mockjs';

Mock.mock('/api/setting', 'get', {
  code: 0,
  msg: '',
  data: {
    avatar: '@image(400x300, #894FC4, #FFF, png, "!!!")',
    siteTitle: '我的个人空间',
    mail: 'rusling001@gmail.com',
    weChat: 'Rusling001',
    weChatQrCode: '@image(400x400, #894FC4, #FFF, png)',
    github: 'https://github.com/Rusling-R',
    microsoft: 'rusling001@outlook.com',
    icp: '暂无',
    favicon: '@image(400x400, #894FC4, #FFF, png, "!")'
  }
});
