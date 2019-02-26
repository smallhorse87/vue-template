import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import Qs from 'qs'
import global from '@/utils/global'
// axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  baseURL: global.dynamicBaseURL, // api 的 base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true // 允许携带cookie
  // headers: {
  // "Content-Type": "application/x-www-form-urlencoded"
  // },
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.data = Qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // if (store.getters.token) {
    //    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.ret !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 返回2时，删除cookie和role
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.ret === 2 || res.ret === 50008 || res.ret === 50012 || res.ret === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
