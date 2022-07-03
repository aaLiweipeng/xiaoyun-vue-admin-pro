import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  // 在store/index.js中注册后，
  // 可以取到 子模块的state字段
  token: state => state.user.token,

  userInfo: state => state.user.userInfo,
  /**
   * 因为token是字符串，可以直接通过判空来判断，
   * 这里是对象，不能直接判空，而要判断是否为空对象
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: state => {
    console.log('getters state.user.userInfo \n', state.user.userInfo)
    return JSON.stringify(state.user.userInfo) !== '{}'
  },

  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },

  sidebarOpened: state => state.app.sidebarOpened,

  language: state => state.app.language,

  mainColor: state => state.theme.mainColor,

  // TagView的访问
  tagsViewList: state => state.app.tagsViewList
}
export default getters
