import Cookies from 'js-cookie'
import { localStorageSetItem, localStorageGetItem } from '@/utils'

const TokenKey = 'Admin-Token'
const userInfoKey = 'userInfo'
const EXP = 30 // day

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, persistent = false) {
  if (persistent) {
    return Cookies.set(TokenKey, token, { expires: EXP })
  } else {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(data, persistent = false) {
  if (persistent) {
    localStorageSetItem(userInfoKey, data)
  } else {
    sessionStorage.setItem(userInfoKey, JSON.stringify(data))
  }
}
// EXP * 24 * 60 * 60 * 1 * 1000
export function getUserInfo() {
  if (sessionStorage.getItem(userInfoKey)) {
    return JSON.parse(sessionStorage.getItem(userInfoKey))
  } else {
    return localStorageGetItem(userInfoKey, EXP * 24 * 60 * 60 * 1 * 1000)
  }
}
