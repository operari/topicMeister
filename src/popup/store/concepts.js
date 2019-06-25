import Vue from 'vue'
import storage from '../../ext/storage'

export const concept = {
  state: {
    concepts: storage.get('tmConcepts') || {},
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
