// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './common/css/common.css'
import api from './api/index.js';
import store from './store/index'
import echarts from 'echarts'
import map from '@/utils/map.js'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.prototype.$echarts = echarts
// var map = new PIE.Map({
//   type: 1
// })
// console.log(map)
Vue.use(iView)
Vue.use(map)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
