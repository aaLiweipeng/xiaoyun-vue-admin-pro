<template>
  <!-- 主题图标
  v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 外露按钮 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <div><svg-icon icon="change-theme" /></div>
      </el-tooltip>
    </div>

    <!-- 下拉菜单项 这里下拉菜单就展示一个item-->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 展示选色弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)
const handleSetTheme = command => {
  // 用于控制 颜色picker的 布尔值
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
