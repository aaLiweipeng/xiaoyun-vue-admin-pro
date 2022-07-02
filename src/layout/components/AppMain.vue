<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { generateTitle } from '@/utils/i18n'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

/**
 * 根据一定规律 生成 title
 * @route 输入路由
 * @return title 字符串
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由，最后一个url节 作为title
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    // 如果有meta 获取国际化结果字符串
    title = generateTitle(route.meta.title)
  }
  return title
}

/**
 * 监听路由变化
 */
const store = useStore()
watch(
  route,
  (to, from) => {
    // 路由一发生变化，判断是否是普通路由，是的话就启动 添加tag流程
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to

    // 二参 整一个JSObject作为一个参数传递过去，意一个tag对象
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    // 第一次进入appMain或者 刷新AppMain的时候，watch就要被马上触发
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
