import Mock from 'mockjs';

Mock.mock('/api/project', 'get', {
  code: 0,
  msg: '',
  'data|20': [
    {
      id: '@guid',
      name: '@ctitle(5, 10)',
      url: '@url',
      'github|1': ['https://github.com', ''],
      'description|1-5': ['@csentence(20, 50)'],
      'thumb|1': ['@image(400x300, #894FC4, #FFF, png, !!!!)', null],
      'order|+1': 1
    }
  ]
});
