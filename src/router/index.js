import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../views/admin/AdminHome.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import AdminPages from '../views/admin/AdminPages.vue'
import AdminTemplates from '../views/admin/AdminTemplates.vue'
import AdminTemplatesCreate from '../views/admin/AdminTemplatesCreate.vue'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'home',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminHome,
      redirect: '/admin/dashboard',
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
      path: '/profile',
      name: 'profile',
      component: HelloWorld,
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ]

const router = new VueRouter({
    mode: 'history',
    base:process.env.BASE_URL,
    linkExactActiveClass: 'active',
    routes
})

export default router