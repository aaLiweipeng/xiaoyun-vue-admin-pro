<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <!-- 弹框内容 -->
    <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"></el-input>

    <!-- 弹框脚部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.excel.close") }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t("msg.excel.confirm")
        }}</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
// import { getUserManageAllList } from '@/api/user-manage'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // const allUser = (await getUserManageAllList()).list
  const allUser = ({
    list: [
      {
        role: [
          {
            id: '1',
            title: '超级管理员'
          },
          {
            id: '2',
            title: '管理员'
          },
          {
            id: '3',
            title: '员工'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        openTime: '1433088000000',
        username: 'super-admin',
        mobile: '188xxxx0001',
        avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '1',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '2',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '3',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'
      }
    ]
  }).list

  console.log(allUser)
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false) // 注意直接'update:modelValue'，刷新model值
}

// 指定默认文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
</script>
