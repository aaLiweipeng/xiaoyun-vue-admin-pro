const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存  【白名单的路由 不需要缓存】
 * @param {*} path
 * @returns
 */
export function isTags (path) {
  return !whiteList.includes(path)
}
