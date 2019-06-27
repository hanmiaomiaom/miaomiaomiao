import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 先找文件，没有就找目录
// 如果找到目录，优先加载目录中的index
import router from './router'

// 所有组件都是Vue实例，我们可以把一些需要在组件中频繁使用的成员放到Vue.prototype中
// 给Vue原型对象扩展成员时，最好加上一个$前缀，避免和组件内部的数据成员冲突
Vue.prototype.$http = axios

// 配置 axios 的基础路径，发送请求时就不需要每次再写http://xxx
// 路径后边的 /.  多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 引入公共样式文件，最好在element 样式文件之后，可以自定义修改elment 内置样式
import './styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
