import request from '@/utils/request'

/**
 * 登录 Function对象 形参data
 * 接收data数据，通过request进行网络请求，返回的是Promise实例
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
