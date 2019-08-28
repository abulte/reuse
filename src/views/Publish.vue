<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Choisissez un jeu de données à associer à votre réutilisation">
        <vue-bootstrap-typeahead required="true" @hit="select" v-model="query" :data="datasets" :serializer="s => s.title" />
      </b-form-group>
      <b-form-group label="Choisissez sous quelle identité publier votre réutilisation">
        <b-form-select :required="true" v-model="reuse.organization" :options="organizations"></b-form-select>
      </b-form-group>
      <b-form-group label="Choisissez le type de votre réutilisation">
        <b-form-select :required="true" v-model="reuse.type" :options="types"></b-form-select>
      </b-form-group>
      <!-- <b-form-input list="dataset-list" v-model="query" @input="debounceInput" autocomplete="off"></b-form-input>
      <datalist id="dataset-list" autocomplete="off">
        <option v-for="dataset in datasets" v-bind:key="dataset.id">{{ dataset.title }}</option>
      </datalist> -->
      <b-button type="submit" variant="primary">Envoyer la réutilisation</b-button>
    </b-form>
  </div>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Api from '@/services/Api'
import debounce from 'debounce'
const $api = new Api()

export default {
  name: 'Publish',
  components: { VueBootstrapTypeahead },
  data () {
    return {
      reuse: {
        private: false,
        type: '',
        datasets: []
      },
      datasets: [],
      query: '',
      types: [
        { value: 'api', text: 'API' },
        { value: 'application', text: 'Application' },
        { value: 'idea', text: 'Idée' },
        { value: 'news_article', text: 'Article de presse' },
        { value: 'paper', text: 'Papier' },
        { value: 'post', text: 'Billet de blog' },
        { value: 'visualization', text: 'Visualisation' },
        { value: 'hardware', text: 'Objet connecté' }
      ]
    }
  },
  mounted () {
    if (!this.$store.state.user.loggedIn) {
      this.$router.push({ path: '/login', query: { next: '/publish' } })
    }
  },
  methods: {
    search () {
      // if (this.query.length <= 3) return
      $api.suggestDataset(this.query).then(res => {
        this.datasets = res.body
      })
    },
    select (dataset) {
      this.reuse.datasets = [ { id: dataset.id } ]
    },
    onSubmit () {
      const reuse = Object.assign(this.reuse, {
        title: this.scrap.data.title,
        description: this.scrap.data.description,
        image: this.scrap.data.image,
        url: this.scrap.url
      })
      $api.createReuse(reuse).then(res => {
        console.log('res', res)
      })
    }
  },
  computed: {
    userData () {
      return this.$store.state.user.data
    },
    scrap () {
      return this.$store.state.scrap
    },
    organizationsRaw () {
      return this.userData && this.userData.organizations
    },
    organizations () {
      if (!this.organizationsRaw) return
      const orgs = this.organizationsRaw.map(o => {
        return { value: o.id, text: `${o.name} (organisation)` }
      })
      orgs.push({ value: 'user', text: 'En mon nom propre' })
      return orgs
    }
  },
  watch: {
    query: debounce(function (e) {
      this.search()
    }, 200)
  }
}
</script>
