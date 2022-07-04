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
    },

    /**
     * 为指定的 tag 修改 title
     * 基于 tagsViewList 修改
     */
    changeTagsView (state, { index, tag }) {
      state.tagsViewList[index] = tag // 修改VueX
      setItem(TAGS_VIEW, state.tagsViewList) // 修改LocalStorage
    },

    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
