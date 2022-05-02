/**
 * 请求的封装层、构建层
 * 用url、method、上层（业务调用层）传来的数据等元素，构建一个请求
 */
// 这里的request实例是axios.create的返回结果，request实例只要接收一个url，
// 即可进行请求，并返回一个 包含结果的promise【参似于ec-pro】
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

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}
