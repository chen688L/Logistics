import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {
  TrendCharts,List,Grid,
} from '@element-plus/icons-vue'
const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    name: 'login',

    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',

    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: "/echarts",
        name: "echarts",
        component: () => import("../views/childrens/EchartsView.vue"),
        meta: {
          title: "数据展示",
          icon:TrendCharts
        }
      },
      {
        path: "/pay",
        name: "pay",
        component: () => import("../views/childrens/PayList.vue"),
        meta: {
          title: "缴费管理",
          icon:Grid
        }
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/childrens/UserOne.vue"),
        meta: {
          title: "住户信息",
          icon:List
        },

        children: [
          {
            path: "/userlist",
            name: "userlist",
            component: () => import("../views/childrens/UserList.vue"),
            meta: {
              classifyTitle: "住户信息",
              title: "住户信息列表"
            }

          },
          {
            path: "/userupdate",
            name: "userupdate",
            component: () => import("../views/childrens/UserUpdate.vue"),
            meta: {
              classifyTitle: "住户信息",
              title: "住户信息修改"
            }
          },
        ]
      },
    ]
  },
  {
    path: "/",
    redirect: "/login"
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
