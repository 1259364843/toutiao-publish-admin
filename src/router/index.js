import Vue from 'vue'
import VueRouter from 'vue-router'

// 加载组件
import Login from '@/views/login'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
