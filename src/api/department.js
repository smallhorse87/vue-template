import request from '@/utils/request'
const DEPARTMENT = '/web/department'

//节点列表
export function getAllDepartmentList() {
  return request({
    url: DEPARTMENT + '/getAllDepartmentList.shtml',
    method: 'get',
    params: {}
  })
}

//部门节点（全部）
export function getVisibleDepartmentTreeStruct() {
  return request({
    url: DEPARTMENT + '/getVisibleDepartmentTreeStruct.shtml',
    method: 'get',
    params: {}
  })
}

//部门节点（可指派）
export function getCanHandleDepartmentTreeStruct(ticketId) {
  return request({
    url: DEPARTMENT + '/getCanHandleDepartmentTreeStruct.shtml',
    method: 'get',
    params: { ticketId }
  })
}

//下载节点二维码
export function downloadQr(departmentId) {
  return request({
    url: DEPARTMENT + '/downloadQr.shtml',
    method: 'get',
    params: { departmentId }
  })
}
