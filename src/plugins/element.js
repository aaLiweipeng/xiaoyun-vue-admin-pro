/**
 * 注册element相关
 */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store'

export default app => {
  app.use(ElementPlus, {
    // 判断getters 中 全局配置lang字段是否为en，否则默认为中文
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
