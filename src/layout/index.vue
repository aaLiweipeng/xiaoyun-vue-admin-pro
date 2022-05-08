<template>
    <!-- :class= 指定 **整个侧边栏的宽度和缩放动画** -->
    <div class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">

       <!-- 左侧 menu -->
       <sidebar
         id="guide-sidebar"
         class="sidebar-container"
         :style="{ backgroundColor: myvariables.menuBg }" />

        <!-- 右侧 主要内容 -->
        <div class="main-container">
            <!-- 顶部的 navbar -->
            <div class="fixed-header">
                <navbar />
            </div>

            <!-- 内容区 -->
            <app-main />
        </div>

    </div>
</template>

<script setup>
import {} from 'vue'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import myvariables from '@/styles/variables.scss'

</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

// 最外层布局
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}

// 右侧顶部的 navbar
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // 父布局宽度（窗口宽 - 左侧栏宽）
  width: calc(100% - #{$sideBarWidth});// sideBarWidth 210px
  // 使得hide样式影响下，nav变化width时候，有一个动画过程
  transition: width #{$sideBarDuration};
}

//.hideSidebar下.fixed-header样式
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});// hideSideBarWidth 54px
}
</style>
