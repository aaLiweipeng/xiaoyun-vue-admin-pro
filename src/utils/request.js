/**
 * 请求基层
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // @这里的取值操作 跟服务端的返回值约定好，相对应
    const { success, message, data } = response.data

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
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
