import path from 'path'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    // 遍历所有一级路由，有子路由的，把子路由都掏出来，
    // 平鋪在 result 这个数组里
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：
 * 某个一级路由为其他一级路由的子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 * @returns 过滤了重复路由的路由表
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  // 以遍历一级数组元素的方式  遍历完整路由数组的元素，过滤
  return routes.filter(route => {
  // 每一个迭代里的 这个完整路由数组的元素，
  // 如果在包含层级路由数组里面，有重复的（path），
  // 则将这轮迭代的 这个数组元素 剔除（filter返回false）
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull (data) {
  // 如果是null
  if (!data) return true

  // 如果是空对象 或者 空数组
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 * @param {*} routes 第一层调用，是 filterRouters 的结果，后面是函数的二次参数
 * @returns 符合菜单可用规则的路由表
 */
export function generateMenus (routes, basePath = '') {
  // 符合规则的路由表
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // item 这里是 路由数组的 一个迭代元素

    // 不存在 children && 不存在 meta ———— 直接 return 00 【迭代终止点 1/3】
    if (isNull(item.meta) && isNull(item.children)) return

    // 存在 children 不存在 meta ———— 进入迭代   10  【迭代终止点 2/3】
    if (isNull(item.meta) && !isNull(item.children)) {
      // 最终返回一个规则的数组对象，return出去
      result.push(...generateMenus(item.children))
      return
    }

    // 合并 path 作为跳转路径 【basePath + 当前迭代的item路径】
    const routePath = path.resolve(basePath, item.path)

    // 路由分离之后，存在同名父路由的情况，需要单独处理
    console.log('generateMenus result --- ', result)
    let route = result.find(item => item.path === routePath)

    // 不存在children 存在meta   ———— 01  菜单项
    // 当前路由尚未加入到 result【result里面find不到，返回false】
    if (!route) {
      // 拓展当前迭代item，加上patch，空children，
      // 构建成一个对象，覆盖route
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在，否则还是弃用掉
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)// 【迭代终止点 3/3】
      }
    }

    // 存在children && 存在meta  ———— 11  包含子菜单的菜单项
    // 存在 children 进入迭代到children, 不一样的是这里当前item的path会作为父url[baseurl]传下去
    // 每一个可用children最终会在 01这个情况里面终止
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
