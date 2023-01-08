import dayjs from 'dayjs'

// 定制一个dataFilter【dayjs】实例，用来 格式化时间戳
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 如果是Number类型 或者 数字内容的字符串，转型成Number（Int）
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  // 格式化时间戳
  return dayjs(val).format(format)
}

// 把dayjs实例注册到全局属性
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
