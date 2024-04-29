import request from '@/utils/http'

const token = localStorage.getItem('token')

export const K8sNodeLis = (data) => {
  return request({
    url: '/api/k8s/node/list',
    method: 'POST',
    data,
    headers: {
        Authorization: `${token}`
    }
  })
}