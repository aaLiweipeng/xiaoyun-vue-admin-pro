<template>
  <div @click="onToggle" >
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 监听变化
const change = () => {
  // 通过框架方法 取到 当前全屏模式值
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  // 调用toggle即可完成全屏模式的切换，同时触发监听器
  console.log('screenfull.toggle()')
  screenfull.toggle()
}

// 设置监听器
onMounted(() => {
  console.log('screenfull onMounted')
  screenfull.on('change', change)
})

// 删除监听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
