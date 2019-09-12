import request from '@/utils/request'

//登录
export function login(username,password,code,uuid) {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: 'api/info',
    method: 'post'
  })
}
// 获取验证码
export function getCodeImg() {
  return request({
    url: 'api/vCode',
    method: 'post'
  })
}
