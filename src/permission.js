import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
// 存在 token ，则进入主页
  if (store.getters.token) {
    if (to.path === '/login') {
      // 要去登录页的，送去主页
      next('/')
    } else {
      // 要去主页的，则

      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        await store.dispatch('user/getUserInfo')
        console.log('perssion.js had dispatched (\'user/getUserInfo\')')
      }
      // 获取完毕之后放行
      next()
    }
  } else {
    // 没有token的情况下，判断to在不在白名单里面
    if (whiteList.indexOf(to.path) > -1) {
      // 白名单有，放行
      next()
    } else {
      // 白名单没有，送去登录页
      next('/login')
    }
  }
})
