import Vue from 'vue'

function defaultErrorCallback (res) {
  console.error('API error', res)
}

export default class Api {
  API_BASE_URL = 'http://dev.local:7000'

  get (path, success, errorCallback) {
    errorCallback = errorCallback || defaultErrorCallback
    return Vue.http.get(`${this.API_BASE_URL}/api/1/${path}/`).then(success, errorCallback)
  }
}
