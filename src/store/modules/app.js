import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    // 控制左侧菜单伸缩
    sidebarOpened: true,

    // 获取国际语言配置字段
    language: getItem(LANG) || 'zh',

    // tagsView
    tagsViewList: getItem(TAGS_VIEW) || []
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
    },

    /**
      * 添加 tags
      */
    addTagsViewList (state, tag) {
      // 遍历tagsViewList
      // 如果意图加入的tag.path 已经存在，则isFind为true，表重复
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })

      // 处理重复【不重复了，再把tag加近VueX】
      if (!isFind) {
        state.tagsViewList.push(tag) // 存VueX
        setItem(TAGS_VIEW, state.tagsViewList)// 存LocalStorage
      }
    }
  },
  actions: {}
}
