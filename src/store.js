import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // TODO make this a "pluggable" store
    user: {
      loggedIn: false,
      token: '',
      data: {}
    },
    scrap: {
      data: {
        title: '',
        description: '',
        image: ''
      },
      url: ''
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
    setUserData (state, data) {
      state.user.data = data
    },
    setScrapResult (state, { url, data }) {
      state.scrap = { url, data }
    },
    // restore store.state from localStorage
    initialiseStore (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  },
  actions: {
    login ({ commit }, token) {
      commit('setLoggedIn')
      commit('setToken', token)
    },
    fillUserData ({ commit }, data) {
      commit('setUserData', data)
    },
    logout ({ commit }) {
      commit('unsetLoggedIn')
      commit('setToken', '')
      commit('setUserData', {})
    },
    fillScrapResult ({ commit }, { url, data }) {
      commit('setScrapResult', { url, data })
    }
  }
})
