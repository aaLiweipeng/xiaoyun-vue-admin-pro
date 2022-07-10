<template>
  <div id="guide-hamburger" class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// 点击回调函数
const toggleClick = () => {
  // 触发sidebarOpened翻转
  store.commit('app/triggerSidebarOpened')
}

const icon = computed(() =>
  // 数据驱动UI【值 驱动 icon值 驱动 图标，响应式驱动图标翻转】
  store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
