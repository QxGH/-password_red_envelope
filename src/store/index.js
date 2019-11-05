import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    network: true
  },
  mutations: {
    changeNetwork(state, value) {
      state.network = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
