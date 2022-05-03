<template>
  <!-- 导航栏整体框架 -->
  <div class="navbar">

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
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // 居右侧头像菜单
  .right-menu {
    display: flex;
    align-items: center;
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
