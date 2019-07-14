import Vue from 'vue'
import { Button, Form, Input } from 'element-ui'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)

new Vue({
  render: h => h(App)
}).$mount('#app')
