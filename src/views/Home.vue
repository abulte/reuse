<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-input
        id="input-1"
        v-model="url"
        type="url"
        required
        placeholder="L'URL de la réutilisation"
      ></b-form-input>
      <b-button type="submit" variant="primary" :disabled="scrapping">
        <b-spinner v-if="scrapping" small></b-spinner>
        Prévisualiser
      </b-button>
    </b-form>
    <b-alert v-if="scrapError" show variant="danger">Désolé, nous n'avons pas pu récupérer assez d'information pour générer votre réutilisation :-/</b-alert>
    <div v-if="hasScrapData">
      <b-card
        :title="scrapData.title"
        :img-src="scrapData.image"
        img-top
        class="mt-2"
      >
        <b-card-text>
          {{ scrapData.description }}
        </b-card-text>
      </b-card>
    </div>
    <div v-if="hasScrapData || scrapError">
      Pas satisfait du résultat&nbsp;? Vous pouvez créer une réutilisation en utilisant <a href="https://www.data.gouv.fr/fr/admin/reuse/new/">l'interface classique de data.gouv.fr.</a>
    </div>
    <b-button variant="success" v-if="hasScrapData" @click="onPublish">
      Publier sur data.gouv.fr
    </b-button>
  </div>
</template>

<script>
import Scrapper from '@/services/Scrapper'

const $scrapper = new Scrapper()

export default {
  name: 'home',
  components: {},
  data () {
    return {
      scrapError: false,
      url: this.$store.state.scrap.url,
      scrapping: false
    }
  },
  computed: {
    scrapData () {
      return this.$store.state.scrap.data
    },
    hasScrapData () {
      return this.$store.state.scrap.url && this.$store.state.scrap.data.title
    }
  },
  methods: {
    onSubmit () {
      this.scrapping = true
      $scrapper.scrap(this.url).then(res => {
        res.json().then(data => {
          this.$store.dispatch('fillScrapResult', { data, url: this.url })
          this.scrapError = false
          this.scrapping = false
        })
      }, err => {
        console.error(err)
        this.$store.dispatch('fillScrapResult', { data: undefined, url: '' })
        this.scrapError = true
        this.scrapping = false
      })
    },
    onPublish () {
      this.$router.push('/publish')
    }
  },
  mounted () {}
}
</script>
