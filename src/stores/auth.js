import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    roles: [],
  }),
  actions: {
    setRoles(roles) {
      this.roles = roles
      localStorage.setItem('roles', JSON.stringify(roles))
    },
    getRoles() {
      return localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : []
    },
  },
})