import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
   {
    name:'home',
    path:'/',
    //在整个项目里，模块路径中 @ 表示的是 src 目录
    // 无论你当前模块在哪里， @ 都可以直接点位到src
    // 加载一个目录就可以默认加载他的index.js\indexedDB.vue\indexedDB.son
    component:()=> import('@views/home')
   },
   {name:'login',
    path:'/login',
    component:()=>import('@views/login')
   
  }
   
  ]
})
