import storage from '../../ext/storage'

export const topic = {
  state: {
    topics: storage.get('tmTopics') || [],
    newTopic: { id: 1, name: '', change: '', picked: false, isChange: false, prepared: false },
    isChangeTopics: false,
    isRemoveTopics: false
  },
  getters: {
    topics (state) {
      return state.topics || []
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
