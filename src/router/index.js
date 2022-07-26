import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import EventsView from '../views/EventsView.vue'
import LoginView from '../views/LoginView.vue'
import SearchView from '../views/SearchView.vue'
import SettingsView from '../views/SettingsView.vue'
import AdminView from '../views/AdminView.vue'
import RegisterView from '../views/RegisterView.vue'
import LongjumpView from '../views/LongjumpView.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/longjump',
    name: 'longjump',
    component: LongjumpView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.path === '/register' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router
