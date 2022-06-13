import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    // 获取localStorage，如果没有，则取默认值
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor (state, newColor) {
      // 设置到VueX
      state.mainColor = newColor
      // 设置到localStorage
      setItem(MAIN_COLOR, newColor)
    }
  }
}
