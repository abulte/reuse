import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(BootstrapVue)

// store store.state in localStorage
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.commit('initialiseStore')
  }
}).$mount('#app')

// TODO move to API or Store if possible
// authenticate against API if token is set
Vue.http.interceptors.push(request => {
  const token = store.state.user.token
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
})
