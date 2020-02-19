import Vue from 'vue'
import VueRouter from 'vue-router'
import Myapp from '../views/myyq'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Myapp',
    component: Myapp
  }
]

const router = new VueRouter({
  routes
})

export default router
