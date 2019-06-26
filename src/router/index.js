import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   // 在整个项目里，模块路径中 @ 表示的是 src 目录
    //   // 无论你当前模块在哪里， @ 都可以直接点位到src
    //   // 加载一个目录就可以默认加载他的index.js\indexedDB.vue\indexedDB.son
    //   component: () => import('@/views/home')
    // },
    {// layout 是显示到 App 根组件的路由出口
      name: 'layout', // 使用Javascript 命名路由导航不会默认渲染子路由
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由：
      // 所有 children 路由都显示到父路由的 router-view 中
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')

    }
  ]
})

/*
全局前置守卫：
当访问路由页面时，会先进入这里
to --- 要去哪里的相关数据
from --来自哪里的相关数据
next -- 允许通过的方法
*/

router.beforeEach((to, from, next) => {
  // 路由导航前，开启进度条
  nprogress.start()
  // 获取数据
  const userInfo = window.localStorage.getItem('user_info')
  // 判断 在去往登录页面的情况下，
  if (to.path === '/login') {
    // 判断：如果有登录信息，则不能去login页面
    if (userInfo) {

    } else {
      // 如果没有登录信息，则去登录页面登录
      next()
    }
  } else {
    // 若不处于登录页面的情况下
    // 如果有登录信息，不能去login页面
    if (userInfo) {
      next()
    } else {
      // 如果没有登录信息，则必须去登录页面登录
      next({ path: '/login' })
      // window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  // 关闭进度条
  nprogress.done()
})
export default router // 导出
