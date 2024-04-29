// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'
import dbUtils from '../libs/util.strotage.js'


export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  const isLogin = ref(false)

  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ username, password }) => {

    try {
      const res = await loginAPI({ username, password })
      console.log(res.Data)

      
      userInfo.value = res.Data
      isLogin.value = true

      dbUtils.set('token', res.Data.finally_token);
      dbUtils.set('email', res.Data.email);
      dbUtils.set('name', res.Data.name);
      dbUtils.set('roles', res.Data.roles);

    } catch (error) {
      console.error('登录失败:', error);
      throw error;
  } 

  }
  

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    isLogin.value = false
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    isLogin
  }
}, 

{
  persist: true,
})