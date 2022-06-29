import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选、构建出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle 默认为空数组
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据容器
  let res = []

  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 匹配 动态路由的 正则
    const re = /.*\/:.*/
    // 动态路由【尾部可接参数的 动态加载路由】不允许被搜索
    // 当前存在 meta 且 meta.title 存在 且当前迭代的item路由 非动态路由时【这个route便符合条件】
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      // 使用 i18n 解析国际化数据，组合成新的 title 内容
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      // 巧用拓展符，拓展title属性
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 时，
    if (route.children) {
      // 迭代调用，且以当前route（path）为父（path），传入下一个迭代
      // tempRoutes 迭代返回的规则数组
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
