function addContentScript () {
  return new Promise((resolve, reject) => {
    var content = chrome.extension.getURL('js/content.js')
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', content)
    document.body.appendChild(script)
    setTimeout(() => resolve(document.querySelector('.tm-box')), 1e3)
  })
}
const p1 = addContentScript()
const p2 = new Promise((resolve, reject) => {
  chrome.runtime.sendMessage('getConcepts', (response) => resolve(response))
})
const p3 = new Promise((resolve, reject) => {
  chrome.runtime.sendMessage('getConceptInProcessTimer', (response) => resolve(response))
})
const module = (() => {
  return {
    concepts: [],
    el: null,
    title: null,
    content: null,
    isHidden: 'tm-box--hidden',
    duration: 5 * 60 * 1e3,
    delay: 5 * 60 * 1e3,
    conceptTimer: {},
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
    setConceptTimer (i, timeLeft) {
      const self = this
      this.conceptTimer.index = i
      let timerId = setTimeout(function tick () {
        if (self.conceptTimer.timeSpent >= (timeLeft || self.duration)) {
          clearTimeout(timerId)
        } else {
          self.conceptTimer.timeSpent += 1000
          console.log(self.conceptTimer.timeSpent)
          chrome.runtime.sendMessage(self.conceptTimer)
          timerId = setTimeout(tick, 1000)
        }
      }, 1000)
    },
    play (el, i) {
      if (this.conceptTimer && this.conceptTimer.index > -1) {
        i = this.conceptTimer.index
        var timeLeft = this.duration - this.conceptTimer.timeSpent
      }
      i = !this.concepts[i] ? 0 : i
      this.title.textContent = this.concepts[i].title
      this.content.textContent = this.concepts[i].content
      el.classList.toggle(this.isHidden)

      this.setConceptTimer(i, timeLeft)
      setTimeout(() => this.stop(el, i), this.duration)
    },
    stop (el, i) {
      el.classList.toggle(this.isHidden)
      setTimeout(() => this.play(el, i + 1), this.delay)
    },
    init (box, concepts, conceptTimer) {
      this.title = box.querySelector('.tm-box__title')
      this.content = box.querySelector('.tm-box__content')
      this.concepts = this.sortConcepts(concepts)
      this.conceptTimer = conceptTimer && conceptTimer.hasOwnProperty('index') ? conceptTimer : { index: -1, timeSpent: 0 }
      this.play(box, 0)
    }
  }
})()

Promise.all([p1, p2, p3])
  .then(
    vals => {
      module.init(vals[0], vals[1], vals[2])
    }
  )
