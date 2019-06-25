import texts from '../../texts'

export const dialog = {
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
