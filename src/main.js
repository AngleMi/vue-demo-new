import Vue from 'vue'
import App from './app.vue'
import { Router } from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import iViewShim from '@/utils/iview-shim'
import '@/icons'

Vue.use(iView)

iViewShim()

Vue.config.productionTip = false

new Vue({
  router: Router,
  store,
  render: h => h(App)
}).$mount('#app')
