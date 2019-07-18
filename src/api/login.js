import request from '../plugin/axios'

function getQueryString (name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

export function AccountLogin (data) {
  return request({
    url: '/login?loginId=' + getQueryString('loginId') + '&integrationName=' + getQueryString('integrationName'),
    method: 'post',
    data: data
  })
}
