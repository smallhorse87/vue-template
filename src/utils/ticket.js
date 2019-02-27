/**
 * ticket相关的操作
 */
export function getTicketTypeOptions() {
  return [{ id: 0, name: '意见建议' }, { id: 1, name: '咨询' }, { id: 2, name: '报修' }, { id: 1, name: '投诉' }]
}

export function getSubmitTypeOptions() {
  return ['顾客', '商户', '业主', '员工', '其他']
}

export function getTicketSourceOptions() {
  return ['客服录入', '集团主入口小程序提交', '业务部门服务窗口小程序提交']
}

export function getStarredOptions() {
  return ['关注', '未关注']
}
export function getServiceQualityOptions() {
  return ['非常不满意', '不满意', '一般', '满意', '非常满意']
}

export function getSeverityOptions() {
  return [{ id: 0, name: '一般投诉' }, { id: 1, name: '重大投诉' }, { id: 2, name: '紧急投诉' }]
}

/** id=5已关闭，合并到已解决*/
export function getStatusOptions() {
  return [{
    id: 0, name: '已提交'
  }, {
    id: 1, name: '已受理'
  }, {
    id: 2, name: '处理中'
  }, {
    id: 3, name: '延期'
  }, {
    id: 4, name: '已解决'
  }]
}

/** 5已关闭不展示到页面，选择框页面展示时直接修改为4*/
export function getChangeStatusOptions() {
  return [{
    id: 0, name: '已提交', 'disabled': true
  }, {
    id: 1, name: '已受理', 'disabled': true
  }, {
    id: 2, name: '处理中'
  }, {
    id: 3, name: '延期'
  }, {
    id: 4, name: '已解决'
  }]
}
