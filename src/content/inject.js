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
  chrome.runtime.sendMessage('getConcepts', response => resolve(response))
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
    timeSpent: 0,
    currentIndex: 0,
    get currentTime () {
      return (new Date()).getTime()
    },
    get timeStart () {
      return new Promise(resolve => chrome.runtime.sendMessage('getTimeStart', response => resolve(response)))
    },
    set timeStart (time) {
      chrome.runtime.sendMessage({ setTimeStart: true, time: time })
    },
    get currentConceptIndex () {
      return this.concepts.findIndex(o => this.timeSpent <= o.stackDuration)
    },
    set currentConceptIndex (i) {
      this.currentIndex = i
    },
    get sumConceptsDuration () {
      return this.concepts.reduce((acc, curr) => acc + curr.fullDuration, 0)
    },
    setTimeSpent () {
      return new Promise(resolve => {
        this.timeStart.then(timeStart => {
          this.timeSpent = (this.currentTime - timeStart) % this.sumConceptsDuration
          resolve()
        })
      })
    },
    getConceptState (o) {
      const result = {
        method: '',
        timeLeft: 0
      }
      const i = this.currentConceptIndex
      const conceptTimeSpent = i > 0 ? this.timeSpent - this.concepts[i - 1].stackDuration : this.timeSpent
      let conceptTimeLeft = this.concepts[i].showDuration - conceptTimeSpent
      if (conceptTimeLeft > -1) {
        result.method = 'show'
        result.timeLeft = conceptTimeLeft
      } else {
        conceptTimeLeft = this.concepts[i].fullDuration - conceptTimeSpent
        result.method = 'hide'
        result.timeLeft = conceptTimeLeft
      }
      this.currentConceptIndex = i
      return result
    },
    sortConcepts (concepts) {
      const sortedConcepts = []
      for (let concept in concepts) {
        concepts[concept]
          .filter(o => o.inProcess)
          .forEach(o => sortedConcepts.push({
            title: o.title,
            content: o.content,
            views: o.views,
            showDuration: o.showDuration,
            hideDuration: o.hideDuration,
            fullDuration: o.showDuration + o.hideDuration
          }))
      }
      sortedConcepts
        .sort((o1, o2) => o1.views - o2.views)
        .reduce((o1, o2, i) => {
          if (i === 1) o1.stackDuration = o1.fullDuration
          o2.stackDuration = o1.stackDuration + o2.fullDuration
          return o2
        })
      return sortedConcepts
    },
    repeat (i) {
      return !this.concepts[i] ? 0 : i
    },
    show (el, i) {
      i = this.repeat(i)
      this.title.textContent = this.concepts[i].title
      this.content.textContent = this.concepts[i].content
      el.classList.remove(this.cssClasses.isHidden)
      setTimeout(_ => this.hide(el, i), this.concepts[i].showDuration)
    },
    hide (el, i) {
      el.classList.add(this.cssClasses.isHidden)
      setTimeout(_ => this.show(el, i + 1), this.concepts[i].hideDuration)
    },
    init (box, concepts) {
      this.title = box.querySelector('.tm-box__title')
      this.content = box.querySelector('.tm-box__content')
      this.concepts = this.sortConcepts(concepts)
      this.timeStart
        .then(timeStart => {
          console.log(this.timeStart)
          if (timeStart === null) {
            this.timeStart = this.currentTime
            this.show(box, this.currentIndex)
          } else {
            this.setTimeSpent()
              .then(result => {
                const conceptState = this.getConceptState()
                this.concepts[this.currentIndex][conceptState.method + 'Duration'] = conceptState.timeLeft
                this[conceptState.method](box, this.currentIndex)
              })
          }
        })
    }
  }
})()

Promise.all([p1, p2])
  .then(
    vals => {
      module.init(vals[0], vals[1])
    }
  )
