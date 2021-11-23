import Vue from 'vue'
import VueRouter from 'vue-router'

// 加载组件
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
Vue.use(VueRouter)

// 路由配置表
const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由存在默认子路由，父路由的name可以不指定
    name: 'layout',
    component: Layout,
    children: [
      {
        // path为空，会默认为子路由渲染
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from从哪个路径跳转来
  // next是一个函数,代表放行
  if (to.path === '/login') return next()
  // 获取token
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果不存在token相关信息，表示未登录，则跳转到登录页面
  if (!user) return next('/login')
  // 直接放行
  next()
})

export default router
