import Api from './Api'
let $api = new Api()

export default class OAuth {
  getToken () {
    const clientId = '5d638f831077e4ca68f05aae'
    const redirectURI = encodeURIComponent('http://localhost:8081/login')
    window.location = `${$api.API_BASE_URL}/fr/oauth/authorize?redirect_uri=${redirectURI}&response_type=token&client_id=${clientId}&scope=default&grant_type=implicit`
  }
}
