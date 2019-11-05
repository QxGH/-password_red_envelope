import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    meta: { 
      title: '口令红包'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/prize',
    name: 'prize',
    meta: { 
      title: '我的奖品'
    },
    component: () => import('../views/Prize.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
