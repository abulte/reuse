<template>
  <div>
    <b-spinner small></b-spinner> Connexion...
  </div>
</template>

<script>
import Api from '../services/Api'
import OAuth from '../services/OAuth'
const $api = new Api()
const $oauth = new OAuth()

export default {
  name: 'Login',
  data () {
    return {
      next: this.$route.query.next || '/'
    }
  },
  mounted () {
    if (!this.token) {
      console.debug('No oauth token found ¯\\_(ツ)_/¯')
      if (!this.$store.state.user.loggedIn) {
        $oauth.getToken(this.next)
      } else {
        console.log('Logged in', this.$store.state.user)
        this.$router.push(this.next)
      }
    } else {
      this.$store.dispatch('login', this.token).then(() => {
        // TODO move to store
        return $api.get('me').then(data => {
          return data.body
        }).then(data => {
          return this.$store.dispatch('fillUserData', data)
        })
      }).then(() => {
        this.$router.push(this.state)
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
    state () {
      return this.params['state'] && decodeURIComponent(this.params['state'])
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
