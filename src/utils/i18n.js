import i18n from '@/i18n'

/**
 * 语言包的属性值恰好跟定义路由时候的 title键一样
 * @param {*} title 属性键
 * @returns 国际化结果
 */
export function generateTitle (title) {
  return i18n.global.t('msg.route.' + title)
}
