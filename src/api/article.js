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

/**
 * 新增一篇文章
  */

export const addArticle = (data, draft = false) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            // 是否存为草稿，true为草稿
            draft: draft
        },
        // 请求体
        data: data
    })
}

/**
 * 修改一篇文章
  */

 export const updateArticle = (articleId, data, draft = false) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${articleId}`,
        params: {
            draft: draft
        },
        data: data
    })
}

/**
 * 获取指定文章
  */

 export const getArticle = (articleId) => {
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${articleId}`
    })
}

/**
 * 修改文章评论状态
  */

export const updataCommentStatus = (articleId, allowComment) => {
	return request({
			method: 'PUT',
			url: '/mp/v1_0/comments/status',
			params: {
					article_id: articleId
			},
			data: {
					allow_comment: allowComment
			}
	})
}
