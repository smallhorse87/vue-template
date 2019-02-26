import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

// 所有权限通用路由表
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/ticket/getMyUnCloseList',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      // component: () => import('@/views/dashboard/index'),
      component: () => import('@/views/ticket/getMyUnCloseList'),
      meta: { title: '首页' }
    }]
  }

  // { path: '*', redirect: '/404', hidden: true }
]
// 实例化的时候只挂载constantRouterMap
export default new Router({
  // mode: 'history', //后端支持可开
  base: '/admin/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/ticket/getMyUnCloseList',
    component: Layout,
    meta: {
      roles: ['admin', 'operator']
    },
    children: [
      {
        path: '',
        name: 'ComplexTable',
        component: () => import('@/views/ticket/getMyUnCloseList'),
        meta: { title: '未指派工单', icon: 'guide', roles: ['admin', 'operator'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
