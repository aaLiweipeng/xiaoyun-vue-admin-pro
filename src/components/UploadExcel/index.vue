<!-- 上传Excel组件的封装 -->
<template>
  <div class="upload-excel">
    <!-- 左边上传按钮 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <!-- 右边拖拽输入 -->
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { defineProps, ref } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})

/**
 * 点击上传触发
 */
const loading = ref(false)
const excelUploadInput = ref(null) // input的组件实例
const handleUpload = () => {
  // 点击上传按钮div，触发的是 隐藏的 负责文件上传的input组件 ！！
  excelUploadInput.value.click()
}
// input组件被触发后 用户选好文件后，会触发 change事件，这里是事件的监听回调！
const handleChange = e => {
  const files = e.target.files // 取出事件携带的数据【文件列表】
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 拖拽文本释放时触发
 */
const handleDrop = e => {
  // 判断上传状态 如果有文件已经在上传中 则跳过
  if (loading.value) return

  // 判断文件数量
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要为一个文件')
    return
  }

  // 判断文件格式
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = e => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置 生成 源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 触发上传事件
 */
const upload = rawFile => {
  excelUploadInput.value.value = null // 上传前，把input的值清空
  // 如果没有指定 上传前的回调 的话，直接进入后续操作 ！！
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作 ！！
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据（异步）
 */
const readerData = rawFile => {
  loading.value = true // 开启上传按钮的loading
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()

    // 设置事件处理回调
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体 ———— excel --> json
      const results = XLSX.utils.sheet_to_json(worksheet)
      console.log('workbook.SheetNames --- ', workbook.SheetNames)
      console.log('header --- ', header)
      console.log('results --- ', results)
      // 7. 传入解析之后的数据【表头 + json形式的excel数据】
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }

    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 把 根据导入内容，生成的数据 通过回调传递出去
 */
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none; // 把输入框隐藏了，只保留上传功能
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
