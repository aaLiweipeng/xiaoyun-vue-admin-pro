<template>

  <!-- 注意template这里的route,
  来自于外部、上层调用传进来的props参数route -->

  <!-- 支持渲染多级 menu 菜单 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <!-- 封皮按钮组 -->
    <template #title>
      <menu-item
       :title="route.meta.title"
       :icon="route.meta.icon">
      </menu-item>
    </template>

    <!-- 拥有children 进入下一轮迭代 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-submenu>

  <!-- 没有children了，到底了，不用再迭代了，渲染原子item组件 -->
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item
     :title="route.meta.title"
     :icon="route.meta.icon">
    </menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem'
import { defineProps } from 'vue'
// 定义 props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
