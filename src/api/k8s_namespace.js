import request from '@/utils/http'

const token = localStorage.getItem('token')

export const K8sNamespaceList = (data) => {
  return request({
    url: '/api/k8s/namespace/list',
    method: 'POST',
    data,
    headers: {
        Authorization: `${token}`
    }
  })
}


