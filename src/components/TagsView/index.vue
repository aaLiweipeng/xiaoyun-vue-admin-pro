<template>

  <!-- TagView容器 -->
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
          borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        }"
        v-for="(tag, index) in $store.getters.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <i
          v-show="!isActive(tag)"
          class="el-icon-close"
          @click.prevent.stop="onCloseClick(index)"
        />
      </router-link>
    </el-scrollbar>

    <!-- 右键菜单内容 -->
    <context-menu
      v-show="menuVisible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script setup>
import ContextMenu from './ContextMenu.vue'
import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const route = useRoute()

/**
 * 是否作为 选中状态
 *
 * 如果当前路由path 等于 这个tag的path，那就该为 选中状态
 */
const isActive = (tag) => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */
const store = useStore()
const onCloseClick = index => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })
}

// contextMenu 右键菜单相关
const selectIndex = ref(0)
const menuVisible = ref(false) // 右键菜单可见性开关
const menuStyle = reactive({
  left: 0,
  top: 0
})
/**
 * 展示 menu
 */
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  menuVisible.value = true
}

/**
 * 关闭 menu
 */
const closeMenu = () => {
  menuVisible.value = false
}

/**
 * 监听变化
 * 如果右键菜单是显示的，给全局DOM窗口添加一个点击事件，点击即关闭右键菜单，
 * 如果右键菜单是隐藏的，则去除 全局DOM窗口的 点击事件
 */
watch(menuVisible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    position: flex
  }

  .tags-view-item {
    display: inline-block;// 似flex布局
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      color: #fff;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
