import Vue from 'vue'
import Vuex from 'vuex'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import texts from '../texts.json'
import LoadScript from 'vue-plugin-load-script'
import storage from '../ext/storage'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(LoadScript)
Vue.use(Vuex)
Vue.loadScript('http://localhost:8098')

// storage.clear()
// storage.set('tmTopics', [ { id: 1, name: 'Angular', change: 'Angular', picked: false, prepared: false, isChange: false, remove: false }, { id: 2, name: 'React', change: 'React', picked: false, prepared: false, isChange: false, remove: false } ])
// storage.set('tmConcepts', { 'Angular': [{ id: 1, title: 'Что такое Angular', content: 'Angular представляет фреймворк от компании Google для создания клиентских приложений. Прежде всего он нацелен на разработку SPA-решений (Single Page Application), то есть одностраничных приложений. Angular предоставляет такую функциональность, как двустороннее связывание, позволяющее динамически изменять данные в одном месте интерфейса при изменении данных модели в другом, шаблоны, маршрутизация и так далее.', titleChange: 'Что такое Angular', contentChange: 'Angular представляет фреймворк от компании Google для создания клиентских приложений. Прежде всего он нацелен на разработку SPA-решений (Single Page Application), то есть одностраничных приложений. Angular предоставляет такую функциональность, как двустороннее связывание, позволяющее динамически изменять данные в одном месте интерфейса при изменении данных модели в другом, шаблоны, маршрутизация и так далее.', remove: false, inProcess: true, views: 2, timeLeft: 0 }, { id: 2, title: 'Компоненты', content: 'Компоненты представляют основные строительные блоки приложения Angular. Компонент управляет отображением представления на экране.', titleChange: 'Компоненты', contentChange: 'Компоненты представляют основные строительные блоки приложения Angular. Компонент управляет отображением представления на экране.', remove: false, inProcess: true, views: 0, timeLeft: 0 }], 'React': [{ id: 1, title: 'Что такое React', content: 'React это реактивная либа', titleChange: 'Что такое React', contentChange: 'React это реактивная либа', remove: false, inProcess: true, views: 1, timeLeft: 0 }] })

const topic = {
  state: {
    topics: storage.get('tmTopics'),
    newTopic: { id: 1, name: '', change: '', picked: false, isChange: false, prepared: false },
    isChangeTopics: false,
    isRemoveTopics: false
  },
  getters: {
    topics (state) {
      return state.topics
    },
    pickedTopic (state) {
      return state.topics.find(o => o.picked)
    },
    newTopic (state) {
      return state.newTopic
    },
    isChangeTopics (state) {
      if (!state.isRemoveTopics) {
        return state.isChangeTopics
      }
    },
    isChangeAllTopics (state) {
      const r = state.topics.reduce((a, b) => a + b.isChange, 0)
      if (!r || r === state.topics.length) {
        return true
      }
      return false
    },
    isChangeAllTopicsTryly (state) {
      return !state.topics.some(o => !o.isChange)
    },
    isRemoveTopics (state) {
      return state.isRemoveTopics
    }
  },
  mutations: {
    addTopic (state) {
      state.isAddNewTopic = !state.isAddNewTopic
    },
    changeTopics (state) {
      if (!state.isRemoveTopics) {
        state.isChangeTopics = !state.isChangeTopics
        state.topics.forEach(o => (o.isChange = !o.isChange))
      }
      if (state.isChangeTopics && !this.getters.isChangeAllTopics) {
        state.topics.forEach(o => (o.isChange = false))
      }
    },
    changeTopic (state, id) {
      const topic = state.topics.find(o => o.id === id)
      this.commit({
        type: 'resetConcept',
        name: topic.name,
        change: topic.change
      })
      topic.isChange = !topic.isChange
      topic.name = topic.change
      if (!this.getters.isChangeAllTopicsTryly) {
        state.isChangeTopics = false
      }
      storage.set('tmTopics', state.topics)
    },
    removeTopics (state) {
      if (!state.isChangeTopics) {
        state.isRemoveTopics = !state.isRemoveTopics
      }
    },
    setWillRemoveTopic (state, id) {
      state.topics.find(o => o.id === id).remove = true
    },
    removeTopic (state) {
      state.topics.splice(state.topics.findIndex(o => o.remove), 1)
      storage.set('tmTopics', state.topics)
    },
    updateNewTopicName (state, newTopicName) {
      state.newTopic.name = newTopicName
    },
    pushTopic (state, newTopic) {
      state.topics.push(newTopic)
      storage.set('tmTopics', state.topics)
    },
    restoreNewTopic (state) {
      state.newTopic.name = ''
    },
    resetPreparedTopic (state) {
      this.getters.topics.find(o => o.prepared).prepared = false
    },
    updateChangeTopicName (state, payload) {
      state.topics.find(o => o.id === payload.id).change = payload.value
    },
    pickedTopic (state, id) {
      const prevPicked = state.topics.find(o => o.picked && o.id !== id)
      if (prevPicked) {
        prevPicked.picked = false
      }
      state.topics.find(o => o.id === id).picked = true
    }
  },
  actions: {}
}

const concept = {
  state: {
    concepts: storage.get('tmConcepts'),
    newConcept: {
      id: 1,
      title: 'Type title here...',
      content: 'Type content here...',
      titleChange: '',
      contentChange: '',
      remove: false,
      inProcess: true
    },
    isRemoveConcept: false
  },
  getters: {
    concepts (state) {
      return state.concepts
    },
    newConcept (state) {
      return state.newConcept
    },
    isRemoveConcept (state) {
      return state.isRemoveConcept
    }
  },
  mutations: {
    prepareConcept (state) {
      const topicPrepared = this.getters.topics.find(o => o.prepared)
      Vue.set(state.concepts, topicPrepared.name, [Object.assign({}, state.newConcept)])
      storage.set('tmConcepts', state.concepts)
    },
    resetConcept (state, payload) {
      if (payload.change === payload.name) {
        return
      }
      Vue.set(state.concepts, payload.change, state.concepts[payload.name].slice())
      delete state.concepts[payload.name]
      storage.set('tmConcepts', state.concepts)
    },
    updateConceptTitleChange (state, payload) {
      const picked = this.getters.pickedTopic.name
      state.concepts[picked].find(o => o.id === payload.id).titleChange = payload.value
    },
    updateConceptContentChange (state, payload) {
      const picked = this.getters.pickedTopic.name
      state.concepts[picked].find(o => o.id === payload.id).contentChange = payload.value
    },
    updateConcept (state, payload) {
      const picked = this.getters.pickedTopic.name
      const concept = state.concepts[picked].find(o => o.id === payload.id)
      concept.title = concept.titleChange
      concept.content = concept.contentChange
      storage.set('tmConcepts', state.concepts)
    },
    updateNewConceptTitle (state, title) {
      state.newConcept.title = title
    },
    updateNewConceptContent (state, content) {
      state.newConcept.content = content
    },
    newConceptId (state, pickedConcept) {
      state.newConcept.id = pickedConcept[pickedConcept.length - 1].id + 1
    },
    restoreNewConcept (state) {
      state.newConcept.id = 1
      state.newConcept.title = 'Type title here...'
      state.newConcept.content = 'Type content here...'
    },
    pushConcept (state, pickedConcept) {
      this.commit('newConceptId', pickedConcept)
      pickedConcept.push(Object.assign({}, state.newConcept))
      storage.set('tmConcepts', state.concepts)
    },
    setWillRemoveConcept (state, id) {
      state.concepts[this.getters.pickedTopic.name].find(o => o.id === id).remove = true
    },
    unsetWillRemoveConcept (state) {
      const concept = state.concepts[this.getters.pickedTopic.name].find(o => o.remove)
      concept.remove = false
    },
    isRemoveConcept (state) {
      state.isRemoveConcept = !state.isRemoveConcept
    },
    removeConcept (state) {
      if (state.isRemoveConcept) {
        const picked = state.concepts[this.getters.pickedTopic.name]
        if (picked.some(o => o.remove)) {
          picked.splice(picked.findIndex(o => o.remove), 1)
          storage.set('tmConcepts', state.concepts)
        }
      }
    }
  },
  actions: {
  }
}

const dialog = {
  state: {
    texts: {
      title: '',
      content: ''
    },
    isHidden: true,
    dialogAccept: false,
    dialogDecline: false
  },
  getters: {
    indexRemoveTopic (state) {
      return state.indexRemoveTopic
    },
    isHiddenDialog (state) {
      return state.isHidden
    },
    dialogTexts (state) {
      return state.texts
    }
  },
  mutations: {
    toggleDialog (state) {
      state.isHidden = !state.isHidden
    },
    dialogAccept (state) {
      state.dialogAccept = true
    },
    dialogDecline (state) {
      state.dialogDecline = true
    },
    setDialogTexts (state, category) {
      const dialogTexts = state.texts
      for (let prop in dialogTexts) {
        dialogTexts[prop] = texts[category][prop]
      }
    },
    closeDialog (state, ref) {
      state.isHidden = true
    }
  },
  actions: {
    dialogAcceptAsync (context) {
      return new Promise((resolve, reject) => {
        context.commit('dialogAccept')
        resolve()
      })
    },
    dialogDeclineAsync (context) {
      return new Promise((resolve, reject) => {
        context.commit('dialogDecline')
        resolve()
      })
    }
  }
}

const dropdown = {
  state: {
    ddMenu: {},
    ddConcept: {},
    newDropdown: {
      isHidden: true,
      actions: {}
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
      if (this.getters.isChangeAllTopics) {
        const ref = payload.ref
        const id = payload.id
        const prop = payload.prop
        state[ref][id].actions[prop].reverse()
      }
    },
    pushDropdown (state, payload) {
      const id = !state[payload.ref]['1'] ? '1' : Math.max.apply(null, Object.keys(state[payload.ref])) + 1
      const cloneNewDropdown = Object.assign({}, state.newDropdown)
      cloneNewDropdown.actions = Object.assign({}, payload.actions)
      Vue.set(state[payload.ref], id, Object.assign({}, cloneNewDropdown))
    }
  },
  getters: {
    isHiddenDropdown: state => (ref, id) => {
      return state[ref][id] && state[ref][id].isHidden
    },
    getMenuActions: state => (ref, id) => {
      return state[ref][id] && state[ref][id].actions
    }
  }
}

const store = new Vuex.Store({
  strict: true,
  modules: {
    dialog,
    dropdown,
    topic,
    concept
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root)
})
