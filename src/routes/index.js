import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes.map'

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router