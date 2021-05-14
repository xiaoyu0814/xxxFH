import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

const store=new Vuex.Store({
  state,
  getters: {},
  actions: {},
  mutations: {}
});

export default store
