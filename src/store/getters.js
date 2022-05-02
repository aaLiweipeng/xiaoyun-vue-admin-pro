const getters = {
  // 在store/index.js中注册后，
  // 可以取到 子模块的state字段
  token: state => state.user.token,

  userInfo: state => state.user.userInfo,
  /**
   * 因为token是字符串，可以直接通过判空来判断，
   * 这里是对象，不能直接判空，而要判断是否为空对象
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
