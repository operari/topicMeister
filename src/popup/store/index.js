import Vue from 'vue'
import Vuex from 'vuex'
import LoadScript from 'vue-plugin-load-script'

import { dialog } from '../store/dialog'
import { dropdown } from '../store/dropdown'
import { topic } from '../store/topics'
import { concept } from '../store/concepts'

Vue.use(LoadScript)
Vue.use(Vuex)
// Vue.loadScript('http://localhost:8098')

export const store = new Vuex.Store({
  strict: true,
  modules: {
    dialog,
    dropdown,
    topic,
    concept
  }
})
