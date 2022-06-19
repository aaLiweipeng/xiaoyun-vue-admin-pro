<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

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
