import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    // 控制左侧菜单伸缩
    sidebarOpened: true,

    // 获取国际语言配置字段
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    /**
      * 设置国际语言配置字段
      */
    setLanguage (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  },
  actions: {}
}
