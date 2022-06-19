import colorFun from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'

/**
 * 把需要替换的原始颜色 替换成 设定标签字符串
 * @param {*} data 传入一个样式表或色值表【这里主要面向element-plus色值表】
 * @returns 返回一个 被设定标签覆盖的 样式表
 */
const getStyleTemplate = data => {
  // element-plus 部分默认色值表
  // key 是 element-plus 默认色值
  // value 是 我们自己设定的标签，方便后面把这些设定标签 替换成 对应的主题色
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    // 把 要替换的默认颜色字符串（如'#3a8ee6'、'#53a8ff'）
    // 替换成 我们设定的标志字符串（如'shade-1'、'light-1'）
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

/**
 * 网络请求 去
 * 获取 element-plus 的官方原始默认样式表
 */
const getOriginalStyle = async () => {
//   const version = require('element-plus/package.json').version

  // const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  // 目前可能因为代理不一样，这个只能在360上获取到数据，在谷歌不行
  const url = '//unpkg.com/element-plus/dist/index.css'

  console.log('getOriginalStyle url --- ', url)
  const { data } = await axios(url)

  // 把获取到的数据 筛选为 原样式模板
  return getStyleTemplate(data)
}

/**
 * 根据用户更改、选定的主题色 生成色值表
 * @param {*} primary 默认 或者 用户更改、选定的主题色
 * @returns 一个JSO key组是设定标签 value组是对应的色值
 */
export const generateColors = primary => {
  if (!primary) return

  const colors = {
    primary
  }

  console.log('generateColors primary --- ', primary)
  Object.keys(formula).forEach(key => {
    // 将准备好的 颜色模板json文件formula中的 primary位置，
    // 替换成用 用户更改、选定的主题色
    const value = formula[key].replace(/primary/g, primary)

    // 把字符串形式的color 转换成 十六进制的颜色表达形式 字符串
    // 注意rgbHex 和 convert的运用
    console.log('generateColors forEach value --- ', value)
    colors[key] = '#' + rgbHex(colorFun.convert(value))
  })
  return colors
}

/**
 * ！！！！！【纲要流程！！】根据主色值，生成最新的样式表 ！！！！
 * @param {*} primaryColor 主题色
 * @returns 最终样式表
 */
export const generateNewStyle = async primaryColor => {
  const colors = generateColors(primaryColor)// key是设定的标签 value是提供替换的具体主题色值
  let cssText = await getOriginalStyle() // 返回一个 被设定标签覆盖的 样式表

  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'), // 找到刚刚getStyleTemplate 打（覆盖）进去 的 设定标签
      '$1' + colors[key] // 把设定标签 替换成字符串
    )
  })

  return cssText
}

/**
 * 写入新样式到 全局style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = elNewStyle => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}
