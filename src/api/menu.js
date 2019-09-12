import request from '@/utils/request'


// 获取用户菜单
export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}
