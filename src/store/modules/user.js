import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true, // 表这是一个单独的模块
  state: () => ({
    // 初始值：先从本地缓存中获取，没有的话再初始为空
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken (state, token) {
      // 存VueX
      state.token = token
      // 存本地缓存
      setItem(TOKEN, token)
    }
  },
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
            // 传mutations
            this.commit('user/setToken', data.data.data.token)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
