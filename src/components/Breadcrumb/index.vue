<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <!-- 添加动画 -->
    <transition-group name="breadcrumb">

      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 面包屑的最后一项 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
            {{generateTitle(item.meta.title)}}
        </span>

        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
            {{generateTitle(item.meta.title)}}
        </a>
      </el-breadcrumb-item>

    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref([])

const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    // 类似于菜单规则【有icon、title，才能在左侧菜单展示】
    // 这里的规则是 有title，才能在面包屑上展示
    item => item.meta && item.meta.title
  )
  console.log('route.matched --- ', route.matched)
  console.log('breadcrumbData.value --- ', breadcrumbData.value)
}

// 监听路由变化时触发
watch(
  route, // 监听对象
  () => {
    // 监听的 回调函数
    // 一旦路由发生变化，更新面包屑数据
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 处理面包屑的点击事件
const router = useRouter()
const onLinkClick = item => {
  console.log(item)
  router.push(item.path)
}

// 将来需要进行主题替换，所以这里获取下动态样式
const store = useStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }

  // 鼠标经过时，颜色加深，增强体验！！
  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
