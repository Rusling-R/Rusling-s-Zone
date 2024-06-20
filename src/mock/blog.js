import Mock from 'mockjs';
import queryString from 'querystring';
import html1 from './data';

Mock.mock('/api/blogtype', 'get', {
  code: 0,
  msg: '',
  'data|5-20': [
    {
      'id|+1': 1,
      name: '分类@id',
      'articleCount|20-150': 1,
      'order|+1': 1
    }
  ]
});

Mock.mock(/^\/api\/blog(\?.+)?$/, 'get', function (option) {
  const params = queryString.parse(option.url);
  return Mock.mock({
    code: 0,
    msg: '',
    data: {
      'total|500-3000': 0,
      [`rows|${params.limit || 10}`]: [
        {
          id: '@guid',
          title: '@ctitle(20,50)',
          description: '@cparagraph(5,25)',
          category: {
            'id|1-20': 0,
            name: '分类@id'
          },
          'scanNumber|0-500': 10,
          'commentNumber|0-500': 30,
          'thumb|1': ['@image(400x300, #894FC4, #FFF, png, @natural)', null],
          createDate: '@date("T")'
        }
      ]
    }
  });
});

Mock.mock(/^\/api\/blog\/(.+)$/, 'get', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    title: 'CORS跨域方案详解',
    category: {
      'id|1-10': 1,
      name: '分类@id'
    },
    description: '@cparagraph(1, 10)',
    'scanNumber|0-10000': 0,
    'commentNumber|0-100': 0,
    createDate: "@date('T')",
    toc: [
      { name: '概述', anchor: 'article-md-title-1' },
      {
        name: '简单请求',
        anchor: 'article-md-title-2',
        children: [
          { name: '简单请求的判定', anchor: 'article-md-title-3' },
          { name: '简单请求的交互规范', anchor: 'article-md-title-4' }
        ]
      },
      {
        name: '需要预检的请求',
        anchor: 'article-md-title-5'
      },
      {
        name: '附带身份凭证的请求',
        anchor: 'article-md-title-6'
      },
      {
        name: '一个额外的补充',
        anchor: 'article-md-title-7'
      }
    ],
    htmlContent: html1,
    'thumb|1': ['@image("400x300", "#894FC4", "#FFF", "png", "!!!")', null]
  }
});

Mock.mock('/api/comment', 'post', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    nickname: '@cname',
    content: '@csentence(5, 50)',
    blog: {
      id: '@guid',
      title: '@ctitle(10, 30)'
    },
    createDate: '@date("T")',
    avatar: '@image("100x100", "#894FC4", "#FFF", "png", "!!!")'
  }
});

Mock.mock(/^\/api\/comment\?(.+)$/, 'get', {
  code: 0,
  msg: '',
  data: {
    total: 50,
    'rows|10': [
      {
        id: '@guid',
        nickname: '@cname',
        content: '@csentence(5, 50)',
        blog: {
          id: '@guid',
          title: '@ctitle(10, 30)'
        },
        createDate: '@date("T")',
        avatar: '@image("100x100", "#894FC4", "#FFF", "png", "!!!")'
      }
    ]
  }
});
