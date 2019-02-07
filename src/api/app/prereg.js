import request from '@/plugin/axios'
export function getReg (id) {
  return request({
    url: '/reg/get/' + id,
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function saveReg (data) {
  return request({
    url: '/reg/save',
    method: 'post',
    data: data,
    success: {
      type: 'message',
      options: {
        message: 'Success',
        type: 'success'
      }
    }
  })
}
export function getRegPagedList (query) {
  return request({
    url: '/reg/pagedlist',
    method: 'get',
    params: query
  })
}
export function delReg (id) {
  return request({
    url: '/reg/del',
    method: 'get',
    params: { id: id },
    success: {
      type: 'message',
      options: {
        message: 'Success',
        type: 'success'
      }
    }
  })
}
export function delRegs (ids) {
  return request({
    url: '/reg/batchdel',
    method: 'get',
    params: ids,
    success: {
      type: 'message',
      options: {
        message: 'Success',
        type: 'success'
      }
    }
  })
}
