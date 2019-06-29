import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 先找文件，没有就找目录
// 如果找到目录，优先加载目录中的index
import router from './router'

// 引入公共样式文件，最好在element 样式文件之后，可以自定义修改elment 内置样式
import './styles/index.less'
// 引入获取元素的封装方法
import { getUser } from '@/utils/auth'

// 给Vue原型对象扩展成员时，最好加上一个$前缀，避免和组件内部的数据成员冲突
Vue.prototype.$http = axios

// 配置 axios 的基础路径，发送请求时就不需要每次再写http://xxx
// 路径后边的 /.  多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 所有组件都是Vue实例，我们可以把一些需要在组件中频繁使用的成员放到Vue.prototype中

/**
 * axios 请求拦截器：axios 发出去的请求都会先经过这里
 * config 是本次请求相关配置对象
 */
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const user = getUser()
  // 如果有user数据，则往本次请求中添加用户 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config// 是允许请求发送的开关，我们可以在这里之前进行一些业务逻辑操作
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/**
 * Axios 响应拦截器： axios 收到的影响会先经过这里
 */
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // response  响应结果对象
  // 这里将 response 原样返回，那么发送请求的地方收到的就是 response
  // 我们可以利用逻辑操作控制请求收到的响应数据格式
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
