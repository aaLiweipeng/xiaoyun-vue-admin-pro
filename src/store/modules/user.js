import { login } from '@/api/sys'
import md5 from 'md5'
export default {
  namespaced: true, // 表这是一个单独的模块
  state: () => ({}),
  mutations: {},
  actions: {
    /**
     * 登录请求动作
     * @param {*} context 上下文
     * @param {*} userInfo 用户数据
     * @returns 返回Promise
     */
    login (context, userInfo) {
      // 解构
      const { username, password } = userInfo
      console.log('user.js username = ', username, 'password = ', password)
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password) // md5 加密的密码
        })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
