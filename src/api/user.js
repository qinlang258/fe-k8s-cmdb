import request from '@/utils/http'

export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/goclock/user/get/accessToken',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}