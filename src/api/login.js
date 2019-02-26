import request from '@/utils/request'
import md5 from 'js-md5'

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

const MEMBER = '/web/member'

export function login(userName, password, rememberMe) {
  return request({
    url: MEMBER + '/login.shtml',
    method: 'post',
    data: {
      userName,
      password: md5(password),
      rememberMe
    }
  })
}
