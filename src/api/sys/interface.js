import request from '@/plugin/axios'
export function getInterface (id) {
  return request({
    url: '/intf/get/' + id,
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function getInterfacePagedList (query) {
  return request({
    url: '/intf/paged',
    method: 'get',
    params: query
  })
}
export function saveInterface (data) {
  return request({
    url: '/intf/save',
    method: 'post',
    data: data,
    success: {
      type: 'message',
      options: {
        message: '保存成功',
        type: 'success'
      }
    }
  })
}
export function delInterface (id) {
  return request({
    url: '/intf/del',
    method: 'get',
    params: { id: id },
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function delInterfaces (ids) {
  return request({
    url: '/intf/batchdel',
    method: 'get',
    params: ids,
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function relateInterface (data) {
  return request({
    url: '/intf/relate',
    method: 'post',
    data: data
  })
}
