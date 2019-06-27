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
    concepts: {},
    sortedConcepts: [],
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
      return this.sortedConcepts.findIndex(o => this.timeSpent <= o.stackDuration)
    },
    set currentConceptIndex (i) {
      this.currentIndex = i
    },
    get sumConceptsDuration () {
      return this.sortedConcepts.reduce((acc, curr) => acc + curr.fullDuration, 0)
    },
    setTimeSpent () {
      return new Promise(resolve => {
        this.timeStart.then(timeStart => {
          this.timeSpent = (this.currentTime - timeStart) % this.sumConceptsDuration
          resolve()
        })
      })
    },
    getConceptState () {
      const result = {
        method: '',
        timeLeft: 0
      }
      const i = this.currentConceptIndex === -1 ? 0 : this.currentConceptIndex
      const conceptTimeSpent = i > 0 ? this.timeSpent - this.sortedConcepts[i - 1].stackDuration : this.timeSpent
      let conceptTimeLeft = this.sortedConcepts[i].showDuration - conceptTimeSpent
      if (conceptTimeLeft > -1) {
        result.method = 'show'
        result.timeLeft = conceptTimeLeft
      } else {
        conceptTimeLeft = this.sortedConcepts[i].fullDuration - conceptTimeSpent
        result.method = 'hide'
        result.timeLeft = conceptTimeLeft
      }
      this.currentConceptIndex = i
      return result
    },
    sortConcepts () {
      for (let topicName in this.concepts) {
        this.concepts[topicName]
          .filter(o => o.inProcess)
          .forEach(o => this.sortedConcepts.push({
            id: o.id,
            topicName: topicName,
            title: o.title,
            content: o.content,
            views: o.views,
            showDuration: o.showDuration,
            hideDuration: o.hideDuration,
            fullDuration: o.showDuration + o.hideDuration
          }))
      }
      this.sortedConcepts
        .sort((o1, o2) => o1.views - o2.views)
        .reduce((o1, o2, i) => {
          if (i === 1) o1.stackDuration = o1.fullDuration
          o2.stackDuration = o1.stackDuration + o2.fullDuration
          return o2
        })
    },
    repeat (i) {
      return !this.sortedConcepts[i] ? 0 : i
    },
    updateConceptViews (state, sortedConcept) {
      const concept = this.concepts[sortedConcept.topicName].find(o => o.id === sortedConcept.id)
      if (state === 'show' && !concept.viewsUpdated) {
        concept.views += 1
        concept.viewsUpdated = true
        chrome.runtime.sendMessage({ 'updateConcepts': true, 'concepts': this.concepts })
      }
      if (state === 'hide' && concept.viewsUpdated) {
        concept.viewsUpdated = false
        chrome.runtime.sendMessage({ 'updateConcepts': true, 'concepts': this.concepts })
      }
    },
    show (el, i) {
      i = this.repeat(i)
      this.title.textContent = this.sortedConcepts[i].title
      this.content.textContent = this.sortedConcepts[i].content
      el.classList.remove(this.cssClasses.isHidden)
      setTimeout(_ => {
        this.updateConceptViews('show', this.sortedConcepts[i])
        this.hide(el, i)
      }, this.sortedConcepts[i].showDuration)
    },
    hide (el, i) {
      el.classList.add(this.cssClasses.isHidden)
      this.updateConceptViews('hide', this.sortedConcepts[i])
      setTimeout(_ => {
        this.show(el, i + 1)
      }, this.sortedConcepts[i].hideDuration)
    },
    init (box, concepts) {
      if (box && concepts && Object.keys(concepts).length) {
        this.title = box.querySelector('.tm-box__title')
        this.content = box.querySelector('.tm-box__content')
        this.concepts = concepts
        this.sortConcepts()
        this.timeStart
          .then(timeStart => {
            if (timeStart === null) {
              this.timeStart = this.currentTime
              this.show(box, this.currentIndex)
            } else {
              this.setTimeSpent()
                .then(result => {
                  const conceptState = this.getConceptState()
                  this.sortedConcepts[this.currentIndex][conceptState.method + 'Duration'] = conceptState.timeLeft
                  this[conceptState.method](box, this.currentIndex)
                })
            }
          })
      }
    }
  }
})()

Promise.all([p1, p2])
  .then(
    vals => {
      module.init(vals[0], vals[1])
    }
  )
