import router from './router/routers'
import Config from '@/config'
import {getToken} from '@/utils/token'
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

  }
})
