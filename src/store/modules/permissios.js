import Layout from '@/layout/Layout'

const permission = {
  actions: {
    GenerateRoutes({commit}, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    }
  }
}

export const filterAsyncRouter = (routers) => {             // 遍历后台传来的路由字符串，装换成组件对象
  const accessedRouters = routers.filter(router => {
    if (router.component){
      if (router.component === 'Layout'){
        router.component = Layout
      }else{
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length){
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
  return accessedRouters
}

export const loadView = (view) => {       // 路由懒加载
  return () => import('@/views/${view}')
}

export default permission





