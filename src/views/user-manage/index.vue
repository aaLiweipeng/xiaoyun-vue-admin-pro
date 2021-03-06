<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary"> {{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="id" type="index" />

        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>

        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>

        <el-table-column
         :label="$t('msg.excel.avatar')"
         width="110"
         align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">

            <!-- 如果有 角色列表数据，遍历它，生成tag -->
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                v-for="item in row.role"
                :key="item.id"
                size="mini"
              >
                {{item.title}}
              </el-tag>
            </div>

            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <!-- 操作按钮组 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
          align="center"
        >
          <template #default>
            <el-button type="primary" size="mini">{{
              $t('msg.excel.show')
            }}</el-button>

            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>

            <el-button type="danger" size="mini">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)

// 分页相关
/**
  * size 改变  触发 数据重新获取
  */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
  * 页码改变触发 数据重新获取
  */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
