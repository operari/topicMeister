import storage from '../ext/storage'

chrome.browserAction.setBadgeText({text: 'topic'})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getConcepts') {
    sendResponse(storage.get('tmConcepts'))
  }
  if (request && request.setTimeStart) {
    sendResponse(storage.set('tmTimeStart', request.time))
  }
  if (request === 'getTimeStart') {
    sendResponse(storage.get('tmTimeStart'))
  }
})
