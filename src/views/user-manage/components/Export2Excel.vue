<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <!-- 弹框内容 -->
    <el-input :placeholder="$t('msg.excel.placeholder')"></el-input>

    <!-- 弹框脚部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.excel.close") }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t("msg.excel.confirm")
        }}</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

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
const onConfirm = async () => {
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false) // 注意直接'update:modelValue'，刷新model值
}
</script>
