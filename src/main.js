import Vue from 'vue'
import App from './App.vue'
import router from './router'
//先找文件，没有就找目录
// 如果找到目录，优先加载目录中的index
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
