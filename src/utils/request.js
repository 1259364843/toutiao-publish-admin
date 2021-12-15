/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

import JSONbigint from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',

  // 定义后端返回的原始数据的处理
  // data是原始JSON数据
  transformResponse: [function (data) {
    try {
      // 后端返回的数据可能不是标准的JSON字符串
      return JSONbigint.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器

// 任何请求都会经过这里
// config是当前请求相关的配置信息，可以进行修改
// return config后请求才会发出去
request.interceptors.request.use(function (config) {
  // 从本地存储获取user数据并转换成对象
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  const status = error.response
  if (status === 401) {
    // 清除本地的用户状态
    window.localStorage.removeItem('user')
    // 跳转到登录页
    router.push('/login')
    Message.error('登录状态无效')
  } else if (status === 403) {
    Message('没有操作权限')
  } else if (status === 400) {
    Message('客户端参数错误')
  } else if (status >= 500) {
    Message.error('服务器内部错误')
  }
  return Promise.reject(error)
})

// 导出请求方法
export default request
