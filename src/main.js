import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(infiniteScroll)
Vue.use(vueDebounce)

new Vue({
	render: h => h(App),
}).$mount('#app')
