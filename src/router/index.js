import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import("@/views/login/index.vue")
    },    
    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/index.vue"), 
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/views/home.vue"),
          meta: {
            title: "Home"
          }
        },
        {
          path: "/k8s",
          name: "K8s",
          children: [
            {
              path: "node",
              name: "k8s节点",
              component: () => import("@/views/k8s/node/index.vue"),
              meta: {
                title: "Node"
              }
            },
            {
              path: "deployment",
              name: "Deployment应用",
              component: () => import("@/views/k8s/deployment/index.vue"),
              meta: {
                title: "Deployment"
              }
            }            
          ]
        },
        {
          path: "/system",
          name: "System",
          children: [
            {
              path: "sysconfig",
              name: "系统项",
              component: () => import("@/views/system/sysconfig/index.vue"),
              meta: {
                roles: ["admin"]
              }
            }
          ]}
                                                                 
      ]      
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 获取用户角色
  const userRoles = authStore.getRoles()

  // 检查当前路由是否需要角色
  if (to.meta.roles) {
    const requiredRoles = to.meta.roles

    // 检查用户角色是否满足路由要求
    const hasRequiredRoles = userRoles.some(role => requiredRoles.includes(role))

    if (!hasRequiredRoles) {
      // 如果用户角色不满足要求，重定向到登录页或其他页面

      ElMessage({ type: 'error', message: '权限不允许' })
      next('/login')
      return
    } 
  } 

  next()
})



export default router