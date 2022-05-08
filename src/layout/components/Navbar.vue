<template>
  <!-- 导航栏整体框架 -->
  <div class="navbar">

    <hamburger class="hamburger-container" />

    <div class="navbar-sub-right">
      <!-- 头像下拉菜单外框 -->
      <div class="right-menu">
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
                <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>

              <!-- a标签跳转 创建新页面 -->
              <a target="_blank" href="">
                <el-dropdown-item>课程主页</el-dropdown-item>
              </a>

              <!-- divided 用于显示分割线。看文档 -->
              <el-dropdown-item divided @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '../../components/Hamburger/hamburger.vue'

const store = useStore()
// 退出登录点击事件
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .navbar-sub-right{
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

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

  // 居右侧头像菜单
  .right-menu {
    display: flex;
    // align-items: center;
    justify-content: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;// 指定 鼠标移过变成手指图标

      // 自定义菜单触发按钮组外框
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        // 头像显示部分
        .el-avatar {
          --el-avatar-background-color: none;// 去掉多余的灰色背景
          margin-right: 12px;// 跟小齿轮i标签保持距离
        }
      }
    }
  }
}
</style>
