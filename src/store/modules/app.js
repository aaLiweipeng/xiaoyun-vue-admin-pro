export default {
  namespaced: true,
  state: () => ({
    // 控制左侧菜单伸缩
    sidebarOpened: true
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  },
  actions: {}
}
