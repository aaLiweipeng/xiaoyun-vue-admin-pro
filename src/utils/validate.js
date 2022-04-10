/**
 * 判断是否为外部资源(以 https?:|mailto:|tel: 开头的path，为true)
 * @param {*} path
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
