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
import { USER_RELATIONS } from '@/views/import/utils'

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

  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)

  // 完成 `excel` 导出
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })

  closed()
}

// 该方法负责将 对象数组 转化成 二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  // !!  把每个item 映射成一个 按headers(中文表头键数组） 排列的 值数组 !! ————
  return rows.map(item => {
    // 这里item是一个数据JSOb，但是 Object.keys(headers).map() 返回的已绝对是一个数组
    // Object.keys(headers) 是 中文键数组【其实就是Excel表头数组】
    return Object.keys(headers).map(key => {
      // 角色字段 特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        // 取角色名，编成数组字符串  {id: "1", title: "超级管理员"} => 超级管理员
        return JSON.stringify(roles.map(role => role.title))
      }
      // headers[key] 中文键变英文键； item[headers[key]]取对象的属性值；
      // !! 所以这波 map 是把 中文键数组 映射成 键对应的对象属性的值数组 !! ——————
      // 【看着表头中文键，去数据对象中取值】
      return item[headers[key]]
    })
  })
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
