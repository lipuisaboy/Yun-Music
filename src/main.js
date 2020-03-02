import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/img/font_1659638_0xhgiwjc993c/iconfont.css'

import  VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' 

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
