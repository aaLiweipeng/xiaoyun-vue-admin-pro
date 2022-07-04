<!-- 右键菜单内容 -->

<template>
  <!-- 容器 -->
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t("msg.tagsView.refresh") }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t("msg.tagsView.closeRight") }}
    </li>
    <li @click="onCloseOtherClick" v-if="showCloseOther()">
      {{ $t("msg.tagsView.closeOther") }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const onRefreshClick = () => {
  // 路由 原地刷新
  router.go(0)
}

// 关闭右侧事件
const store = useStore()
const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
}

// 关闭其他
const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}

// 【关闭其他】菜单项的UI控制
const showCloseOther = () => {
  return (store.getters.tagsViewList.length > 1)
}

</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed; // 核心布局格式
  z-index: 3000;
  background: #fff;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee; // 鼠标经过时 背景变灰
    }
  }
}
</style>
