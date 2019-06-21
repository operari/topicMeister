import storage from '../ext/storage'

chrome.browserAction.setBadgeText({text: 'topic'})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getConcepts') {
    sendResponse(storage.get('tmConcepts'))
  }
  if (request === 'getConceptTimer') {
    sendResponse(storage.get('tmConceptTimer'))
  }
})

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log(msg)
    storage.set('tmConceptTimer', msg)
  })
})
