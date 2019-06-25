import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
