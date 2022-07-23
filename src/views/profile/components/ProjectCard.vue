<template>
  <!-- 整体一个卡片布局 -->
  <el-card class="user-container">
    <!-- 注入卡片头部slots -->
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>

    <!-- 注入卡片默认内容slots -->
    <div class="user-profile">

      <!-- 头像 -->
      <div class="box-center">
        <pan-thumb
          :image="$store.getters.userInfo.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ $store.getters.userInfo.title }}
        </pan-thumb>
      </div>

      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ $store.getters.userInfo.username }}
        </div>

        <div class="user-role text-center text-muted">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>
    <!-- 以上是头像部分 -->

    <!-- 项目介绍模块 -->
    <div class="project-bio">
      <div class="project-bio-section">

        <!-- 图标文字 标题头 -->
        <div class="project-bio-section-header">
          <svg-icon icon="introduce" />
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>

        <div class="project-bio-section-body">
          <div class="progress-item" v-for="item in features" :key="item.id">
            <!-- 标题 -->
            <div>{{ item.title }}</div>
            <!-- 进度条 -->
            <el-progress :percentage="item.percentage" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
import { defineProps } from 'vue'
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped lang="scss">
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  // 项目介绍模块
  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;

      // 项目介绍模块 标题头
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;// 划线
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }

      // 项目介绍模块 内容部
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
