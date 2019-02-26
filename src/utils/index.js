/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// num 数字，n长度
export function pad(num, n) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
  // return (Array(n).join(0) + num).slice(-n);
}

// 区域树递归
export function loopTree(data) {
  const tree = []
  for (const i in data) {
    if (data[i].hasOwnProperty('disable')) {
      data[i].isDisabled = data[i].disable
      delete data[i].disable
    }
    tree.push(data[i])
    if (data[i].children && data[i].children.length > 0) {
      loopTree(data[i].children)
    }
  }
  return tree
}

// 换行符号
export function tagTransform(str) {
  return str.replace(/\n|\r\n/g, '<br/>')
}

// localStorage的Set方法封装:记录时间

export function localStorageSetItem(key, value) {
  const curTime = new Date().getTime()
  localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }))
}

// localStorage的Get方法封装:根据过期时间获取
export function localStorageGetItem(key, exp) {
  const data = localStorage.getItem(key)
  const dataObj = JSON.parse(data)
  if (new Date().getTime() - dataObj.time > exp) {
    console.log('用户信息已过期')
    return {}
  } else {
    return dataObj.data
  }
}
