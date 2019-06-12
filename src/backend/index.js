import storage from '../ext/storage'

chrome.browserAction.setBadgeText({text: 'topic'})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getConcepts') {
    sendResponse(storage.get('tmConcepts'))
  }
  if (request === 'getConceptInProcessTimer') {
    sendResponse(storage.get('tmConceptTimer'))
  }
  if (typeof request === 'object') {
    console.log(request)
    storage.set('tmConceptTimer', request)
  }
})
