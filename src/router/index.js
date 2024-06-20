import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import NotFound from '@/view/404';
Vue.use(VueRouter);

const route = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: () => import('@/view/home'), meta: { title: '首页' } },
    {
      name: 'blog',
      path: '/blog',
      component: () => import('@/view/blog/blogList'),
      meta: { title: '博客' }
    },
    {
      name: 'categoryBlog',
      path: '/blog/cate/:categoryId',
      component: () => import('@/view/blog/blogList'),
      meta: { title: '博客' }
    },
    {
      name: 'blogContent',
      path: '/blog/details/:blogId',
      component: () => import('@/view/blog/blogContent'),
      meta: { title: '文章详情' }
    },
    {
      name: 'project',
      path: '/project',
      component: () => import('@/view/project'),
      meta: { title: '项目' }
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('@/view/about'),
      meta: { title: '关于我' }
    },
    {
      name: 'comment',
      path: '/comment',
      component: () => import('@/view/comment'),
      meta: { title: '留言板' }
    },
    { name: '404', path: '/*', component: NotFound }
  ],
  mode: 'history'
});

route.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

route.afterEach(function (to) {
  NProgress.done();
  // 从仓库拿到网站标题
  const titleTemp = store.state.setting.data.siteTitle;
  if (titleTemp) {
    // 有网站标题就拼接当前页面
    document.title = `${to.meta.title}-${titleTemp ? titleTemp : ''}`;
  } else {
    // 没有网站标题就直接使用当前页面
    document.title = to.meta.title;
  }
});

export default route;
