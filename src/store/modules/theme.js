import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.scss'

export default {
  namespaced: true,
  state: () => ({
    // 获取localStorage，如果没有，则取默认值
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables // 注意这里 variables.scss是做初始值，后面可以通过mutations动态改变
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor (state, newColor) {
      // 设置到VueX
      state.mainColor = newColor
      state.variables.menuBg = newColor
      // 设置到localStorage
      setItem(MAIN_COLOR, newColor)
    }
  }
}
