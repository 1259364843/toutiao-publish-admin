import request from '@/utils/request'
// 用户登录
export const getFans = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    // data用来设置POST请求体
    params: params
  })
}
