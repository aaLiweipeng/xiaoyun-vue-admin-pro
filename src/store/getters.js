const getters = {
  // 在store/index.js中注册后，
  // 可以取到 子模块的state字段
  token: state => state.user.token
}
export default getters
