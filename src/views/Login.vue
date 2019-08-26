<template>
  <div>
    <h1>Login page</h1>
  </div>
</template>

<script>
import Api from '../services/Api'
const $api = new Api()
import OAuth from '../services/OAuth'
const $oauth = new OAuth()

export default {
  name: 'Login',
  data () {
    return {}
  },
  mounted () {
    if (!this.token) {
      console.debug('No oauth token found ¯\\_(ツ)_/¯')
      if (!this.$store.state.user.loggedIn) {
        $oauth.getToken()
      } else {
        console.log('Logged in', this.$store.state.user)
        this.$router.push('/')
      }
    } else {
      this.$store.dispatch('login', this.token).then(() => {
        // TODO move to store
        return $api.get('me', data => {
          return data.body
        }).then(data => {
          return this.$store.dispatch('fillData', data)
        })
      }).then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    token () {
      return this.params['access_token']
    },
    expiresIn () {
      return this.params['expires_in']
    },
    params () {
      const parsedParams = {}
      this.$route.hash.split('&').map(part => part.replace(/#/, '')).forEach(param => {
        const parts = param.split('=')
        parsedParams[parts[0]] = parts[1]
      })
      return parsedParams
    }
  }
}
</script>
