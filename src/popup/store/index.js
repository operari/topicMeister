import Vue from 'vue'
import Vuex from 'vuex'
import LoadScript from 'vue-plugin-load-script'

import { dialog } from '../store/dialog'
import { dropdown } from '../store/dropdown'
import { topic } from '../store/topics'
import { concept } from '../store/concepts'

Vue.use(LoadScript)
Vue.use(Vuex)
// Vue.loadScript('http://localhost:8098')

// storage.clear()
// storage.set('tmTopics', [{
//   id: 1,
//   name: 'Angular',
//   change: 'Angular',
//   picked: false,
//   prepared: false,
//   isChange: false,
//   remove: false
// }, {
//   id: 2,
//   name: 'React',
//   change: 'React',
//   picked: false,
//   prepared: false,
//   isChange: false,
//   remove: false
// }])
// storage.set('tmConcepts', {
//   'Angular': [{
//     id: 1,
//     title: 'Что такое Angular',
//     content: 'Angular представляет фреймворк от компании Google для создания клиентских приложений. Прежде всего он нацелен на разработку SPA-решений (Single Page Application), то есть одностраничных приложений. Angular предоставляет такую функциональность, как двустороннее связывание, позволяющее динамически изменять данные в одном месте интерфейса при изменении данных модели в другом, шаблоны, маршрутизация и так далее.',
//     titleChange: 'Что такое Angular',
//     contentChange: 'Angular представляет фреймворк от компании Google для создания клиентских приложений. Прежде всего он нацелен на разработку SPA-решений (Single Page Application), то есть одностраничных приложений. Angular предоставляет такую функциональность, как двустороннее связывание, позволяющее динамически изменять данные в одном месте интерфейса при изменении данных модели в другом, шаблоны, маршрутизация и так далее.',
//     remove: false,
//     inProcess: true,
//     views: 2,
//     timeLeft: 0,
//     showDuration: 10000,
//     hideDuration: 10000
//   }, {
//     id: 2,
//     title: 'Компоненты',
//     content: 'Компоненты представляют основные строительные блоки приложения Angular. Компонент управляет отображением представления на экране.',
//     titleChange: 'Компоненты',
//     contentChange: 'Компоненты представляют основные строительные блоки приложения Angular. Компонент управляет отображением представления на экране.',
//     remove: false,
//     inProcess: true,
//     views: 0,
//     timeLeft: 0,
//     showDuration: 10000,
//     hideDuration: 10000
//   }],
//   'React': [{
//     id: 1,
//     title: 'Что такое React',
//     content: 'React это реактивная либа',
//     titleChange: 'Что такое React',
//     contentChange: 'React это реактивная либа',
//     remove: false,
//     inProcess: true,
//     views: 1,
//     timeLeft: 0,
//     showDuration: 10000,
//     hideDuration: 10000
//   }]
// })

export const store = new Vuex.Store({
  strict: true,
  modules: {
    dialog,
    dropdown,
    topic,
    concept
  }
})
