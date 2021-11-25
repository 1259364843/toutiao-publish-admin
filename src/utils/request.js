/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

import JSONbigint from 'json-bigint'
// axios()
// axios.get()
// axios.post()

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  // baseURL: 'http://ttapi.research.itcast.cn/' // 最新接口地址

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

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
