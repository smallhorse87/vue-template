import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserInfo, getUserInfo } from '@/utils/auth'
import { LocalStorageSetItem } from '@/utils'

import store from '../index'
import router from '../../router'
import md5 from 'js-md5'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    role: '',
    mob: '',
    unitName: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_MOB: (state, mob) => {
      state.mob = mob
    },
    SET_UNITNAME: (state, unitName) => {
      state.unitName = unitName
    }
    // SET_APPLIED: (state, applied) => {
    //   state.applied = applied
    // },
    // SET_APPROVED: (state, approved) => {
    //   state.approved = approved
    // },
    // SET_FORBIDDEN: (state, forbidden) => {
    //   state.forbidden = forbidden
    // }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.rememberMe).then(response => {
          const data = response.data
          data.id = md5(data.id.toString())
          setToken(data.id, userInfo.rememberMe)
          const roleName = ['customer', 'operator', 'admin']
          const userRoles = []
          if (roleName[data.userRole]) {
            userRoles.push(roleName[data.userRole])
          }
          data.roles = userRoles
          setUserInfo(data, userInfo.rememberMe)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 刷新重置getter
    resetGetter({ commit }) {
      return new Promise(resolve => {
        const data = getUserInfo()
        if (!data) {
          reject('error')
        }

        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('roles must be a non-null array !')
        }
        commit('SET_TOKEN', data.id)
        commit('SET_ROLE', data.userRole)
        commit('SET_MOB', data.mob)
        commit('SET_NAME', data.name)
        commit('SET_UNITNAME', data.unitName)
        // commit('SET_APPLIED', data.applied)
        // commit('SET_APPROVED', data.approved)
        // commit('SET_FORBIDDEN', data.forbidden)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.userRole)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ROLE', '')
          localStorage.clear()
          sessionStorage.clear()
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
