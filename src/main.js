import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// authenticate against API if token is set
Vue.http.interceptors.push(request => {
  const token = store.state.user.token
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
})
