import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    exact:true,
    component: () => import('../views/Home.vue')
  },
  {
    path: '/prize',
    name: 'prize',
    component: () => import('../views/Prize.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
