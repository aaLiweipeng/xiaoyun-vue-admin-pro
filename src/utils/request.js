/**
 * 请求基层
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // @这里的取值操作 跟服务端的返回值约定好，相对应
    const { success, message, data } = response.data
    console.log('request.js response success -- \n', success)
    console.log('request.js response message -- \n', message)
    console.log('request.js response data -- \n', data)

    //   要根据success的成功与否决定下面的操作
    if (success) {
      // 请求成功，业务接口返回true，
      // 则直接返回数据部分，减少顶层代码的数据引用层数
      return data
    } else {
      // 请求成功，但是返回的数据中，success是false
      // 属于 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 请求失败
    console.log('service.interceptors.response.use 请求失败')

    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }

    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要对所有请求统一地去注入token
    if (store.getters.token) {
      // 如果token存在

      // 先判断token是否过期
      if (isCheckTimeout()) {
        // 执行 登出动作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }

      // 请求之前 注入token
      // config.headers.Authorization = `Bearer ${store.getters.token}`
      config.headers.Authorization = `${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
