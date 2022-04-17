import { createStore } from 'vuex'
import user from './modules/user.js'

export default createStore({
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
