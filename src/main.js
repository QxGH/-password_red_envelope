import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

Vue.config.productionTip = false;

// let vConsole = new VConsole();

import 'amfe-flexible/index.js';
import './assets/style/common.css';
// 用户授权，获取 code
import authorize from "@/authorize"


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
  render: h => h(App),
  created () {
    console.log("main.js")
    // console.log(this.$router)
    // 判断是否是微信浏览器
    let ua = window.navigator.userAgent.toLowerCase();
    // if(ua.match(/MicroMessenger/i) != 'micromessenger'){
    // 　　/* 不是微信浏览器 */
    //   this.$router.push({
    //     path: '/login',
    //     query: {
    //       isWxBrowser: 0
    //     }
    //   })
    // };
    // 判断是否有token
    if(!localStorage.getItem("xc_pwd_red_envelope")) {
      // 没有 token 获取 code
      console.log("authorize")
      authorize();
    } else if(location.hash == '#/login') {
      this.$router.push({
        path: '/'
      })
    }
  }
}).$mount('#app')
