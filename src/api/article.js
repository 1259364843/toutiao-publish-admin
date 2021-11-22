/**
 * 文章相关请求模块
 */

import request from '@/utils/request'
/**
 * 获取文章列表
  */

export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        // body参数使用data传 query参数使用params设置headers参数使用headers设置
        params: params
    })
}
/**
 * 获取文章频道数据
  */

 export const getArticlechannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}
/**
 * 删除一篇文章
  */

 export const dleteArticle = (articleId) => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`
    })
}
