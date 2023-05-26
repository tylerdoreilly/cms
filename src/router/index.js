import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminProjects from '@/views/admin/projects/AdminProjects.vue'
import AdminProjectsHome from '@/views/admin/projects/AdminProjectsHome.vue'
import Admin from '@/views/admin/Admin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'
import AdminForms from '@/views/admin/AdminForms.vue'
import AdminTemplates from '@/views/admin/templateBuilder/AdminTemplates.vue'
import AdminTemplatesCreate from '@/views/admin/templateBuilder/AdminTemplatesCreate.vue'
import AdminTemplatesTypes from '@/views/admin/templateBuilder/templateTypes/AdminTemplatesTypes.vue'
import AdminTemplatesControls from '@/views/admin/templateBuilder/customControls/AdminTemplatesControls.vue'
import AdminTemplatesControlsCreate from '@/views/admin/templateBuilder/customControls/AdminTemplatesControlsCreate.vue'
import AdminTemplatesControlsEdit from '@/views/admin/templateBuilder/customControls/AdminTemplatesControlsEdit.vue'
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
      redirect: 'admin/projects',
      beforeEnter: authenticationGuard,
      meta: {
        breadcrumb:{
          label: 'Admin',
        }
      },
      children:[
        {
          path: 'projects',
          name: 'projects',
          component:AdminProjectsHome,
          meta: {
            breadcrumb:{
              label: 'Projects',
              parent: 'admin'
            }
          },
        },
        {
          path: '/project/:id',
          component:AdminProjects,
          redirect: '/admin/project/:id/dashboard',
          meta: {
            breadcrumb: 'Project'
          },
          children:[
            {
              path: '/admin/project/:id/dashboard',
              component:AdminDashboard ,
              meta: {
                breadcrumb: {
                  label: 'Dashboard',
                  parent: 'Project'
                }
              },
            },
            {
              path: '/admin/project/:id/templates',
              name: 'templates',
              component:AdminTemplates,
            },
            {
              path: '/admin/project/:id/templates/edit-template/:id',
              name: 'templates-edit',
              component:AdminTemplatesCreate
            },
            {
              path: '/admin/project/:id/types',
              name: 'types',
              component:AdminTemplatesTypes,
              meta: {
                breadcrumb: {
                  label: 'Types',
       
                }
              },
            },
            {
              path: '/admin/project/:id/custom-controls',
              name: 'controls',
              component:AdminTemplatesControls,
            },
            {
              path: '/admin/project/:id/custom-controls/create',
              name: 'controls-create',
              component:AdminTemplatesControlsCreate,
            },
            {
              path: '/admin/project/:id/custom-controls/edit/:controlId',
              name: 'controls-edit',
              component:AdminTemplatesControlsEdit,
            },
            {
              path: '/admin/project/:id/forms',
              component:AdminForms
            },
            {
              path: '/admin/project/:id/users',
              component:AdminUsers
            },
          ],
        },
      
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