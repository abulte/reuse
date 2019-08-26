import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      token: '',
      data: {}
    }
  },
  mutations: {
    setLoggedIn (state) {
      state.user.loggedIn = true
    },
    unsetLoggedIn (state) {
      state.user.loggedIn = false
    },
    setToken (state, token) {
      state.user.token = token
    },
    setData (state, data) {
      state.user.data = data
    }
  },
  actions: {
    login ({ commit }, token) {
      commit('setLoggedIn')
      commit('setToken', token)
    },
    fillData ({ commit }, data) {
      commit('setData', data)
    },
    logout ({ commit }) {
      commit('unsetLoggedIn')
      commit('setToken', '')
      commit('setData', {})
    }
  }
})
