import request from '@/utils/http'

const token = localStorage.getItem('token')

export const SysconfigListKey = (data) => {
    return request({
      url: '/api/sysconfig/list/key',
      method: 'POST',
      data,
      headers: {
          Authorization: `${token}`
      }
    })
  }

export const SysconfigList = (data) => {
    return request({
        url: '/api/sysconfig/list',
        method: 'POST',
        data,
        headers: {
            Authorization: `${token}`
        }
    })
}

export const SysconfigAdd = (data) => {
    return request({
        url: '/api/sysconfig/add',
        method: 'POST',
        data,
        headers: {
            Authorization: `${token}`
        }        
    })
}

export const SysconfigDelete = (data) => {
    return request({
        url: '/api/sysconfig/delete',
        method: 'POST',
        data,
        headers: {
            Authorization: `${token}`
        }            
    })
}