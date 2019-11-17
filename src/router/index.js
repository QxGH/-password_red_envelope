import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { 
      title: '口令红包'
    },
    component: () => import('../views/Home.vue')
  }, {
    path: '/prize',
    name: 'prize',
    meta: { 
      title: '我的奖品'
    },
    component: () => import('../views/Prize.vue')
  }, {
    path: '/login',
    name: 'login',
    meta: { 
      title: '口令红包'
    },
    component: () => import('../views/Login.vue')
  }, {
    path: '/404',
    name: '404',
    meta: { 
      title: '404'
    },
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
