import Api from './Api'
let $api = new Api()

export default class OAuth {
  getToken (next) {
    const clientId = '5d6690b51077e43bda99f18f'
    const redirectURI = encodeURIComponent('http://localhost:8081/login')
    const state = encodeURIComponent(next)
    window.location = `${$api.API_BASE_URL}/fr/oauth/authorize?redirect_uri=${redirectURI}&response_type=token&client_id=${clientId}&scope=default&grant_type=implicit&state=${state}`
  }
}
