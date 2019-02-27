import request from '@/utils/request'
const WEB = '/web'

// 未处理工单（登录）
export function getMyUnCloseList(query) {
  return request({
    url: WEB + '/getMyUnCloseList.shtml',
    method: 'get',
    params: query
  })
}
// 已指派工单（登录）
export function getOtherList(query) {
  return request({
    url: WEB + '/getOtherList.shtml',
    method: 'get',
    params: query
  })
}
// 已解决工单（登录）
export function getAllCloseList(query) {
  return request({
    url: WEB + '/getAllCloseList.shtml',
    method: 'get',
    params: query
  })
}
// 全部工单（登录）
export function getAllList(query) {
  return request({
    url: WEB + '/getAllList.shtml',
    method: 'get',
    params: query
  })
}

// 工单详情
export function getInfo(ticketId) {
  return request({
    url: WEB + '/getTicketInfo.shtml',
    method: 'get',
    params: { ticketId }
  })
}

// 工单录入
export function submitTicket(data) {
  console.log(data)
  return request({
    url: WEB + '/submitTicket.shtml',
    method: 'post',
    data
  })
}

// 添加备注
export function addNotes(data) {
  return request({
    url: WEB + '/addNotes.shtml',
    method: 'post',
    data
  })
}

// 修改工单类型
export function ticketTypeSend(data) {
  return request({
    url: WEB + '/ticketTypeSend.shtml',
    method: 'post',
    data
  })
}

// 修改投诉级别
export function ticketSeveritySend(data) {
  return request({
    url: WEB + '/ticketSeveritySend.shtml',
    method: 'post',
    data
  })
}

export function ticketStatusChange(data, status) {
  switch (status) {
    case 2 :
      console.log(status)
      return request({
        url: WEB + '/handleProcessTicket.shtml',  // 已受理
        method: 'post',
        data
      })
      break
    case 3 :
      console.log(status)
      return request({
        url: WEB + '/handlePendTicket.shtml',  // 延期
        method: 'post',
        data
      })
      break
    case 4 :
      console.log(status)
      return request({
        url: WEB + '/handleResolveTicket.shtml',  // 已解决
        method: 'post',
        data
      })
      break
    default:
      console.log(status)
      break
  }
}
// 关注，取消关注
export function toggleTicketStar(data) {
  return request({
    url: WEB + '/toggleTicketStar.shtml',
    method: 'post',
    data
  })
}
// 指派部门
export function ticketSend(data) {
  return request({
    url: WEB + '/ticketSend.shtml',
    method: 'post',
    data
  })
}
// 服务质量
export function ticketQualitySend(data) {
  return request({
    url: WEB + '/ticketQualitySend.shtml',
    method: 'post',
    data
  })
}
