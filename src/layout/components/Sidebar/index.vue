<template>
  <div class="">

    <!-- 左侧栏的header部分 -->
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />

      <!-- 标题随着左侧栏的开闭而翻转 -->
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
       <!-- xiaoyun-admin -->
       {{ $t('msg.test') }}
      </h1>
    </div>

    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'
import {} from 'vue'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }

  .el-avatar {
    --el-avatar-background-color: none;// 去掉多余的灰色背景
  }
}
</style>
