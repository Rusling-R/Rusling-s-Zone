import Mock from 'mockjs';

Mock.mock('/api/banner', 'get', {
  code: 0,
  msg: '',
  data: [
    {
      id: '1',
      midImg: '@image(400x300, #894FC4, #FFF, png, @natural)',
      bigImg: '@image(1920x1080, #894FC4, #FFF, png, @natural)',
      title: '@ctitle(4)',
      description: '@csentence(10)'
    },
    {
      id: '2',
      midImg: '@image(400x300, #894FC4, #FFF, png, @natural)',
      bigImg: '@image(1920x1080, #894FC4, #FFF, png, @natural)',
      title: '@ctitle(4)',
      description: '@csentence(10)'
    },
    {
      id: '3',
      midImg: '@image(400x300, #894FC4, #FFF, png, @natural)',
      bigImg: '@image(1920x1080, #894FC4, #FFF, png, @natural)',
      title: '@ctitle(4)',
      description: '@csentence(10)'
    }
  ]
});
