<template>
  <div
    :class="{ show: isShow }"
    class="header-search"
    @click.stop="onShowClick">
    <svg-icon
      class-name="search-icon"
      icon="search"
    />

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in 5"
        :key="option"
        :label="option"
        :value="option"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)

const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// search 相关【el-select的v-model】
const search = ref('')
// 搜索方法
const querySearch = () => {
  console.log('querySearch')
}
// 选中回调
const onSelectChange = () => {
  console.log('onSelectChange')
}

// 检索数据源
const router = useRouter()
// generateMenus返回菜单规则可用路由，且这里用computed做响应式变量
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log('generateMenus(filterRoutes) --- ', generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})
console.log('searchPool --- ', searchPool)

/**
  * 搜索库相关
  * Fuse 一参：数据源 ； 二参：配置对象
  */
const fuse = new Fuse(searchPool, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度 超过这个值的 才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

console.log(fuse)
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>