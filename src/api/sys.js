/**
 * 请求封装层、构建层
 */
import request from '@/utils/request'

/**
 * 登录 Function对象 形参data
 * 接收data数据，通过request进行网络请求，返回的是Promise实例
 * @return 返回给外面的是 包装request请求结构的promise
 */
export const sysLogin = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
