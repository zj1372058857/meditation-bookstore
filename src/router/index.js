import router from './routers'
import store from '@/store'
import Config from '@/config'
import {getToken} from '@/utils/token'
import {buildMenus} from '@/api/menu'
import {filterAsyncRouter} from '@/store/modules/permissions'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSprinner: false})     //NProgress Configuration

const whiteList = ['/login']    // 无指向的空白列表

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title + '-' + Config.webName
  }
  NProgress.start()     // 开启进度条
  if(getToken()){       // 校验cookie中是否有token
    //已登录，但要跳转的页面是登录页
    if(to.path === '/login'){
      next({
        path: '/'
      })
      NProgress.done()      // 如果是首页，就不加载进度条
    }else{
      if(store.getters.roles.length===0){
        store.dispatch('GetInfo').then(res => {       // 获取用户信息
          loadMenus(next, to)     // 动态路由，获取菜单
        }).catch((error) => {
          store.dispatch('LogOut').then(() => {
            location.reload()       // 重新实例化路由对象，避免bug
          })
        })
      }else if(store.getters.loadMenus){
        store.dispatch('updateLoadMenus').then(res => {})
        loadMenus(next, to)
      }
    }
  }else{
    if (whiteList.indexOf(to.path) != -1){    // 白名单，免登录
      next()
    }else{
      next(`/login?redirect=${to.path}`)    // 否则全部重定向到登录页,注：此处不是单引号
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => {      //存储路由
      router.addRoutes(asyncRouter)         // 动态添加可访问路由表
      next({...to, replace: true})          // hack方法，确保路由添加完成
    })
  })
}

router.afterEach(() => {
  NProgress.done()        // 结束进度条
})
