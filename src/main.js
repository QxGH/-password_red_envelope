import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

Vue.config.productionTip = false;

import 'amfe-flexible/index.js';

import './assets/style/common.css';

// 获取 code 
import authorize from "@/authorize"
authorize();

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
