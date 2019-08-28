import Vue from 'vue'

function defaultErrorCallback (res) {
  console.error('API error', res)
}

export default class Api {
  API_BASE_URL = 'http://dev.local:7000'

  get (path, params, errorCallback) {
    params = params || {}
    errorCallback = errorCallback || defaultErrorCallback
    return Vue.http.get(`${this.API_BASE_URL}/api/1/${path}/`, { params: params }).catch(errorCallback)
  }

  post (path, data, errorCallback) {
    errorCallback = errorCallback || defaultErrorCallback
    return Vue.http.post(`${this.API_BASE_URL}/api/1/${path}/`, data).catch(errorCallback)
  }

  searchDataset (query) {
    return this.get('datasets', { q: query })
  }

  suggestDataset (query) {
    return this.get('datasets/suggest', { q: query })
  }

  // TODO upload image beforehand :-/
  createReuse (data) {
    return this.post('reuses', data)
  }
}
