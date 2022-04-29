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
      // 要去主页的，则直接放行
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
