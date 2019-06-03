import Vue from 'vue'
import Vuex from 'vuex'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import texts from '../texts.json'
import LoadScript from 'vue-plugin-load-script'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(LoadScript)
Vue.use(Vuex)
Vue.loadScript('http://localhost:8098')

const dialog = {
  state: {
    texts: {
      title: '',
      content: ''
    },
    isHidden: true,
    dialogAccept: false,
    indexRemoveTopic: -1
  },
  getters: {
    indexRemoveTopic (state) {
      return state.indexRemoveTopic
    },
    isHiddenDialog (state) {
      return state.isHidden
    }
  },
  mutations: {
    toggleDialog (state) {
      state.isHidden = !state.isHidden
    },
    dialogAccept (state) {
      state.dialogAccept = true
    },
    setWillRemoveTopicIndex (state, n) {
      state.indexRemoveTopic = n
    },
    setDialogTexts (state, category) {
      const dialogTexts = state.texts
      for (let prop in dialogTexts) {
        dialogTexts[prop] = texts['dialog-remove'][prop]
      }
    }
  },
  actions: {
    dialogAcceptAsync (context) {
      return new Promise((resolve, reject) => {
        context.commit('dialogAccept')
        resolve()
      })
    }
  }
}

const dropdown = {
  state: {
    ddMenu: {
      1: {
        isHidden: true,
        actions: {
          'add-topic': ['Add topic', 'Cancel'],
          'change-topics': ['Change topics', 'Cancel'],
          'remove-topics': ['Remove topics', 'Cancel']
        }
      }
    },
    ddConcept: {
      1: {
        isHidden: true,
        actions: {
          'change-concept': ['Change concept', 'Cancel'],
          'remove-concept': ['Remove concept', 'Cancel']
        }
      },
      2: {
        isHidden: true,
        actions: {
          'change-concept': ['Change concept', 'Cancel'],
          'remove-concept': ['Remove concept', 'Cancel']
        }
      }
    }
  },
  mutations: {
    closeDropdown (state, ref) {
      for (let prop in state[ref]) {
        state[ref][prop].isHidden = true
      }
    },
    toggleDropdown (state, payload) {
      const ref = payload.ref
      const id = payload.id
      state[ref][id].isHidden = !state[ref][id].isHidden
      if (payload.close) {
        state[ref][id].isHidden = false
      }
    },
    reverseActionText (state, payload) {
      const ref = payload.ref
      const id = payload.id
      const prop = payload.prop
      state[ref][id].actions[prop].reverse()
    }
  },
  getters: {
    isHiddenDropdown: state => (ref, id) => {
      return state[ref][id].isHidden
    },
    getMenuActions: state => (ref, id) => {
      return state[ref][id].actions
    }
  }
}

const store = new Vuex.Store({
  modules: {
    a: dialog,
    b: dropdown
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root)
})
