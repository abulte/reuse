<template>
  <div id="app" class="container">
    <div v-if="user.loggedIn">Bienvenue {{ user.data.first_name }} {{ user.data.last_name }}</div>
    <h1>Publiez votre réutilisation sur data.gouv.fr</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      user: this.$store.state.user
    }
  }
}
</script>

<style>
</style>
