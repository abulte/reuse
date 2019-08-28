import Vue from 'vue'

const SCRAPPER_URL = 'https://metadata-parser.abulte.now.sh/api/parse'

export default class Scrapper {
  scrap (url) {
    url = `${SCRAPPER_URL}?url=${url}`
    return Vue.http.get(url)
  }
}
