import Vue from 'vue'
import VueRouter from 'vue-router'
// import AdminHome from '@/views/admin/AdminHome.vue'
import Admin from '@/views/admin/Admin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'
import AdminPages from '@/views/admin/AdminPages.vue'
import AdminForms from '@/views/admin/AdminForms.vue'
import AdminTemplates from '@/views/admin/templates/AdminTemplates.vue'
import AdminTemplatesCreate from '@/views/admin/templates/AdminTemplatesCreate.vue'
import AppLogin from '@/views/AppLogin.vue'

import { authenticationGuard } from "@/auth/auth-guard";

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/dashboard',
      beforeEnter: authenticationGuard,
      children:[
        {
          path: '/admin/dashboard',
          component:AdminDashboard 
        },
        {
          path: '/admin/users',
          component:AdminUsers
        },
        {
          path: '/admin/pages',
          component:AdminPages
        },
        {
          path: '/admin/forms',
          component:AdminForms
        },
        {
          path: '/admin/templates',
          component:AdminTemplates,
        },
        {
          path: '/admin/templates/edit-template/:id',
          component:AdminTemplatesCreate
        },
        {
          path: '/admin/create-template',
          component:AdminTemplatesCreate
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin,
    },
  ]

const router = new VueRouter({
    mode: 'history',
    base:process.env.BASE_URL,
    linkExactActiveClass: 'active',
    routes
})

export default router