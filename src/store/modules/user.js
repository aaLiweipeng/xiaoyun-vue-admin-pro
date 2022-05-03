/**
 * VueX 用户子模块
 */
import { sysLogin, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '../../router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true, // 表这是一个单独的模块
  state: () => ({
    // 初始值：先从本地缓存中获取，没有的话再初始为空
    token: getItem(TOKEN) || '',

    // 注意这里不是初始化为空，而是空对象
    userInfo: {}
  }),
  mutations: {
    // 存token
    setToken (state, token) {
      // 存VueX
      // 业务判断时使用 如 src\permission.js 前端路由守卫判断
      state.token = token

      // 存本地缓存
      // 初始化state.token时 使用
      setItem(TOKEN, token)
    },

    // 存 userInfo
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      console.log('modules/user.js setUserInfo ---\n', userInfo)
    }
  },
  actions: {
    /**
     * 登录请求动作
     * @param {*} context 上下文
     * @param {*} userInfo 调用者传来的 用户数据
     * @returns 返回Promise
     */
    login (context, userInfo) {
      // 解构
      const { username, password } = userInfo
      console.log('user.js username = ', username, 'password = ', password)
      return new Promise((resolve, reject) => {
        // 返回一个封装数据请求结果的Promise
        sysLogin({
          username,
          password: md5(password) // md5 加密的密码
        })
          .then(data => {
            // 登录后操作

            console.log('user.js login then data -- ', data)
            router.push('/')
            // 调用VueX
            // 传mutations
            this.commit('user/setToken', data.token)
            // 保存登录时间【获取token的时间戳】
            setTimeStamp()
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    /**
     * 获取用户信息
     */
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },

    /**
     * 退出登录动作
     */
    logout () {
      // 清楚token、用户信息、本地缓存
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // 跳转到登录页
      router.push('/login')
    }
  }
}
