import axios from 'axios'
import Config from '@/config'
import {getToken} from "./token"
import { Notification, MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router/routers'



const service = axios.create({
  baseURL: process.env.BASE_API,      // API的baseAPI
  timeout: Config.timeout             // 请求超时时间
});
//request拦截器
service.interceptors.request.use(
  config => {
    if(getToken()){
      config.headers['Authorization'] = 'Bearer '+getToken()        //让每个请求携带自定义token
    }
    config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
);
//response拦截器
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300){
      Notification.error({
        title: response.message
      });
      return Promise.reject('error')
    }else{
      return response.data
    }
  },
  error => {
    let code = 0;
    try {
      code = error.response.data.status
    }catch (e) {
      if (error.toString().indexOf('Error: timeout') != -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        });
        return Promise.reject('error')
      }
      if (error.toString().indexOf('Error: Network Error') != -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        });
        return Promise.reject('error')
      }
    }
      if (code === 401){
        MessageBox.confirm(
          message = '登录状态已过期',
          title = '系统提示',
          options = {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(res =>{
          store.dispatch('LogOut').then(res => {
            location.reload()                       //重新加载，避免bug
          })
        })
      }else if(code === 403){
        router.push({
          path: '/401'
        })
      }else{
        const errorMsg = error.response.data.message
        if(errorMsg !== undefined){
          Notification.error({
            title: errorMsg,
            duration: 2500
          })
        }
      }
      return Promise.reject('error')
    }
);
export default service
