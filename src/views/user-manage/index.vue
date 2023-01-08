<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">
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
          <template #default="{ row }">
            <el-button type="primary" size="mini">{{
              $t('msg.excel.show')
            }}</el-button>

            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>

            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
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

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getUserManageList } from '@/api/user-manage'
// import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import ExportToExcel from './components/Export2Excel.vue'

const i18n = useI18n()

// 数据相关
const tableData = ref([]) // 如此便可实现表格【响应式】
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  console.log('/user/manage getListData() --- ')
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
// 一进来就运行，获取数据！
getListData()

// 处理导入用户后数据不重新加载的问题【因为keep alive】
onActivated(getListData)

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

const router = useRouter()
/**
 * excel 导入点击事件 跳转页面
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

/**
  * 删除按钮点击事件
  */
const onRemoveClick = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    // await deleteUser(row._id) // 调用删除接口
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
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
