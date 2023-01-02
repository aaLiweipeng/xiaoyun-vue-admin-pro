<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
// import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

/**
    * 数据解析成功之后的回调
    */
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  console.log('Import(updateData) --- ', updateData)
  // await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
  * 整理数据；把中文key 转换成 英文key，生成新的数据数组
  */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {} // 定义行数据 缓存容器
    // 把中文key 转换成 英文key
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        // 针对 `openTime` 进行单独处理
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
