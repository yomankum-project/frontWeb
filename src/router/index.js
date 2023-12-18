import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/DashboardView.vue'

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

const userPath = [
  {
    path: '/dashboard'
  },
]

const adminPath = [
  {
    path: '/users'
  },
]

router.beforeEach(async (to) => {
  for (const route of adminPath) {
    if (route.path == to.path) {
      const canAccess = await canAdminAccess(to, route)
      if (!canAccess) return '/dashboard'
    }
  }

  for (const route of userPath) {
    if (route.path == to.path) {
      const canAccess = await canUserAccess(to, route)
      if (!canAccess) return '/signin'
    }
  }
})

const canAdminAccess = (async () => {
  const user = useUserStore();
  const { userdata } = storeToRefs(user);
  if (userdata.value.role == 'admin') {
    return true
  } else {
    return false
  }
})

const canUserAccess = (async () => {
  const user = useUserStore();
  const { info } = storeToRefs(user);
  console.log(info.value.checkLogin)
  if (info.value.checkLogin == 'login') {
    return true
  } else {
    return false
  }
})

export default router
