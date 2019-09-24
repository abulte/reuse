import Vue from 'vue'
import store from '@/store'

function defaultErrorCallback (res) {
  console.error('API error', res)
}

export default class Api {
  API_BASE_URL = 'https://next.data.gouv.fr'
  UPLOADER_BASE_URL = 'http://localhost:3000/api'

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

  uploadReuseImage (reuseId, imageUrl) {
    const token = store.state.user.token
    const url = `${this.UPLOADER_BASE_URL}/upload`
    const query = { params: { url: imageUrl, reuse: reuseId, token: token } }
    return Vue.http.get(url, query).catch(defaultErrorCallback)
  }

  createReuse (data) {
    return this.post('reuses', data).then(res => {
      return this.uploadReuseImage(res.body.id, data.image)
    })
  }
}
