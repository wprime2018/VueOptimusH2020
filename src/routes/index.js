import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes.map'

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = 'VueFood'

  if (to.hasOwnProperty('meta')) {
    document.title = to.meta.title
  }

  next()
})

export default router