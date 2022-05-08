import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './getters'
import app from './modules/app'

export default createStore({
  getters,
  modules: {
    user,
    app
  }
})

// // Origin code
// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
