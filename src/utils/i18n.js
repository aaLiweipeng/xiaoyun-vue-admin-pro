import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

/**
 * 语言包的属性值恰好跟定义路由时候的 title键一样
 * @param {*} title 属性键
 * @returns 国际化结果
 */
export function generateTitle (title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 【观察者模式】
 * 接收可拓展的回调函数 作为参数，
 * 这里可以视为 被观察者，
 * 调用这个函数的地方 可以视为 观察者；
 * 当国际化变量发生变化时，回调这些“注册”到这里的 回调函数
 * @param  {...any} cbs 可拓展的回调函数参数
 */
export function watchSwitchLang (...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
