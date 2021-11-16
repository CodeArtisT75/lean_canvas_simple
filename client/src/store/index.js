import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      username: '',
      name: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },
    clearUser(state) {
      state.user = {
        id: '',
        username: '',
        name: ''
      }
    }
  },
  actions: {},
  modules: {}
})
