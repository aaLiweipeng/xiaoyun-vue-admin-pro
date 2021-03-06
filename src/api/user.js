import request from '@/utils/request'

/**
 * 获取账号的项目功能
 */
export const GetFeature = () => {
  return request({
    url: '/user/feature'
  })
}

/**
 * 章节接口
 */
export const GetChapter = () => {
  return request({
    url: '/user/chapter'
  })
}
