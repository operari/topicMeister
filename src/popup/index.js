import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { store } from './store/index'
console.log('%c⧭', 'color: #00bf00', store)
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root)
})
