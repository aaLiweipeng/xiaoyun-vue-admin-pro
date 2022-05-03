import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage'

/**
 * 设置时间戳
 */
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 获取时间戳
 */
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

/**
 * 判断是否超时
 */
export function isCheckTimeout () {
  // 当前时间戳
  var currentTime = Date.now()
  // 上次缓存token 那个时刻 的时间戳
  var timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
