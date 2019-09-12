import {getToken,removeToken} from '@/utils/token'
import {getInfo} from '@/api/login'

const user = {
  state: {
    token: getToken,
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false          // false是为了防止死循环
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  //获取用户信息
  GetInfo({commit}){
    return new Promise(((resolve, reject) => {
      getInfo().then(res => {
        setUserInfo(res, commit)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    }))
  },

  //退出
  LogOut({commit}){
    return new Promise(((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    }))
  },
  updateLoadMenus({commit}){
    return new Promise(((resolve, reject) => {
      commit('SET_LOAD_MENUS', false)
    }))
  }
}
export const setUserInfo = (res, commit) =>{
  // 赋予基础权限，避免死循环
  if (res.roles.length === 0){
    commit('SET_ROLES', ['MENU_SYSTEM_DEFAULT'])
  }else{
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res)
}
export default user
