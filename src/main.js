// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routers'
import store from './store'
//注册element-ui
import ElementUI from 'element-ui'
//样式
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'        // 全局样式

import locale from 'element-ui/lib/locale/lang/zh-CN'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(ElementUI, {locale})
Vue.config.productionTip = false
require('babel-polyfill')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
