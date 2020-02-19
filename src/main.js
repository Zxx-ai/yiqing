import Vue from 'vue'
import Myapp from './myapp'
import router from './router'
import store from './store'
import './views/styel.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Myapp)
}).$mount('#app')
