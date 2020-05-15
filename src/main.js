import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueChart from 'vue-chartjs'
import Chart from 'chart.js'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'

Vue.use(VueAxios, axios);
Vue.use(VueChart, Chart);

// Url Base
axios.defaults.baseURL = "http://localhost:3000/api";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
