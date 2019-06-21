function addContentScript () {
  return new Promise((resolve, reject) => {
    var content = chrome.extension.getURL('js/content.js')
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', content)
    document.body.appendChild(script)
    setTimeout(() => resolve(document.querySelector('.tm-box')), 100)
  })
}
const p1 = addContentScript()
const p2 = new Promise((resolve, reject) => {
  chrome.runtime.sendMessage('getConcepts', (response) => resolve(response))
})
const p3 = new Promise((resolve, reject) => {
  chrome.runtime.sendMessage('getConceptTimer', (response) => resolve(response))
})
const module = (() => {
  return {
    concepts: [],
    el: null,
    title: null,
    content: null,
    cssClasses: {
      isHidden: 'tm-box--hidden'
    },
    showDuration: 0.1 * 60 * 1e3,
    hideDuration: 0.1 * 60 * 1e3,
    conceptTimer: { index: -1, timeSpent: 0, isShowing: false, isHidden: false },
    isTabInit: true,
    isShowing: true,
    isHidden: false,
    currentIndex: 0,
    timerId: 0,
    port: '',
    get duration () {
      const duration = this.conceptTimer.isShowing ? this.showDuration : this.hideDuration
      // console.log('duration', duration)
      return duration
    },
    sortConcepts (concepts) {
      const sortedConcepts = []
      for (let prop in concepts) {
        concepts[prop]
          .filter(o => o.inProcess)
          .forEach(o => sortedConcepts.push({ title: o.title, content: o.content, views: o.views }))
      }
      sortedConcepts.sort((o1, o2) => o1.views - o2.views)
      return sortedConcepts
    },
    pushConceptTimerStorage () {
      if (this.isTabInit) {
        this.port.postMessage(this.conceptTimer)
        // chrome.runtime.sendMessage(this.conceptTimer)
      }
    },
    updateConceptTimer (i, showing, hidden) {
      // console.log('isTabInit: ', this.isTabInit)
      return new Promise((resolve, reject) => {
        const self = this
        this.conceptTimer.index = i
        this.conceptTimer.isShowing = showing
        this.conceptTimer.isHidden = hidden
        this.timerId = setTimeout(function tick () {
          // console.log('conceptTimer: ', self.conceptTimer)
          // console.log('index: ', self.conceptTimer.index)
          self.conceptTimer.timeSpent += 1e3
          // console.log('timeSpent', self.conceptTimer.timeSpent)
          // console.log('duration', self.duration)
          // console.log('======>')
          self.pushConceptTimerStorage()
          if (self.conceptTimer.timeSpent >= self.duration) {
            clearTimeout(self.timerId)
            self.conceptTimer.timeSpent = 0
            // console.log('clearTimeout')
            resolve()
          } else {
            self.timerId = setTimeout(tick, 1e3)
          }
        }, 1e3)
      })
    },
    setTabInit (conceptTimer) {
      if (conceptTimer) {
        console.log('obj')
        this.isTabInit = false
        Object.assign(this.conceptTimer, conceptTimer)
        this.isShowing = this.conceptTimer.isShowing
        this.isHidden = this.conceptTimer.isHidden
        this.currentIndex = this.conceptTimer.index
      } else {
        this.port = chrome.runtime.connect({name: 'tmConceptTimer'})
      }
    },
    repeat (i) {
      return !this.concepts[i] ? 0 : i
    },
    show (el, i) {
      // console.log('call show')
      // console.log('i before repeat', i)
      i = this.repeat(i)
      // console.log('i after repeat', i)
      this.title.textContent = this.concepts[i].title
      this.content.textContent = this.concepts[i].content
      el.classList.remove(this.cssClasses.isHidden)
      this.updateConceptTimer(i, true, false)
        .then(result => {
          this.hide(el, i)
        })
    },
    hide (el, i) {
      el.classList.add(this.cssClasses.isHidden)
      // console.log('call hide')
      this.updateConceptTimer(i, false, true)
        .then(result => {
          this.show(el, i + 1)
        })
    },
    init (box, concepts, conceptTimer) {
      this.title = box.querySelector('.tm-box__title')
      this.content = box.querySelector('.tm-box__content')
      this.concepts = this.sortConcepts(concepts)
      this.setTabInit(conceptTimer)
      console.log('currentIndex', this.currentIndex)
      if (this.isShowing) {
        console.log('isShowing')
        this.show(box, this.currentIndex)
      }
      if (this.isHidden) {
        console.log('isHidden')
        this.hide(box, this.currentIndex)
      }
    }
  }
})()

Promise.all([p1, p2, p3])
  .then(
    vals => {
      module.init(vals[0], vals[1], vals[2])
    }
  )
