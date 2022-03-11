import Vue from 'vue'
import App from './App'
import less from 'less'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store/store'
import router from './router'

Vue.config.productionTip = false
Vue.use(less)
Vue.use(ViewUI)
Vue.use(Vuex)


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  router
})
