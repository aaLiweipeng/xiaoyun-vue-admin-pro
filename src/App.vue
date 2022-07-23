<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})

// 点击颜色选择器的确认按钮之后，主题色会存到localStorage里面，
// 这里刷新的时候要去读取，拿出来用
const store = useStore()
generateNewStyle(store.getters.mainColor)
  .then(newStyleText => {
    writeNewStyle(newStyleText)
  })
</script>

<style>
</style>
