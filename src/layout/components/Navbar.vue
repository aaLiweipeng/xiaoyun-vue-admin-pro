<template>
  <!-- 导航栏整体框架 -->
  <div class="navbar">

    <hamburger class="hamburger-container" />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />

    <!-- 头像下拉菜单外框 -->
    <div class="right-menu">

      <!-- 头部搜索栏 -->
      <header-search class="right-menu-item hover-effect"></header-search>

      <!-- 全屏设置按钮 -->
      <screenfull class="right-menu-item hover-effect" />

      <!-- 主题颜色按钮 -->
      <theme-picker class="right-menu-item hover-effect"></theme-picker>

      <!-- 语言切换按钮 -->
      <lang-select class="right-menu-item hover-effect" />

      <!-- 头像下拉菜单 -->
      <!-- trigger 点击触发 -->
      <el-dropdown class="avatar-container" trigger="click">

        <!-- 自定义菜单触发按钮组外框 -->
        <div class="avatar-wrapper">
          <!-- 头像显示部分 -->
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>

            <!-- a标签跳转 创建新页面 -->
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>

            <!-- divided 用于显示分割线。看文档 -->
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '../../components/Hamburger/hamburger.vue'
import Breadcrumb from '../../components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemeSelect/index'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'

const store = useStore()
// 退出登录点击事件
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;// 划重点
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // 左侧菜单汉堡开关图标
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    // hover 动画, 使得hover变色翻转的时间变长【从瞬发变成0.5s】，体验提升
    transition: background 0.5s;

    &:hover {
      // 鼠标移过时，背景变灰色
      background: rgba(0, 0, 0, 0.1);
    }
  }

  // 面包屑
  .breadcrumb-container {
  }

  // 居右侧头像菜单
  .right-menu {
    flex: 1; // 对父兄弟，自己占1
    display: flex;// 对子女，控制子女为flex！！ 宽度按流式！
    justify-content: flex-end;// 规定腔内子女居右
    // align-items: center;
    padding-right: 16px;

    ::v-deep .right-menu-item {
         display: inline-block;
         padding: 0 18px 0 0;
         font-size: 24px;
         color: #5a5e66;
         vertical-align: text-bottom;
         line-height: 50px;// 调节高度

         &.hover-effect {
           cursor: pointer;
         }
    }

    ::v-deep .avatar-container {
      cursor: pointer;// 指定 鼠标移过变成手指图标

      // 自定义菜单触发按钮组外框
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        // 头像显示部分
        .el-avatar {
          margin-right: 12px;// 跟小齿轮i标签保持距离
        }
      }
    }
  }
}
</style>
