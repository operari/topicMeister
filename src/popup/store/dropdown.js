import Vue from 'vue'

export const dropdown = {
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
