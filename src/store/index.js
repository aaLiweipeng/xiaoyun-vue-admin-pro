import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    user
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
