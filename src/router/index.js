import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/public/HomeView.vue'
import SignIn from '@/views/public/SignIn.vue'
import SignUp from '@/views/public/SignUp.vue'
import Dashboard from '@/views/private/DashboardView.vue'
import Calendar from '@/views/private/CalendarView.vue'
import Profile from '@/views/private/ProfileView.vue'
import Account from '@/views/private/AccountView.vue'
import Statistic from '@/views/private/StatisticView.vue'
import Settings from '@/views/private/SettingView.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
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
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: Statistic
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: () => import('../views/private/UsersView.vue')
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/public/NotFoundView.vue')
    },
  ]
})

const publicPath = [
  {
    path: '/'
  },
  {
    path: '/about'
  },
  {
    path: '/signin'
  },
  {
    path: '/signup'
  },
]

const userPath = [
  {
    path: '/dashboard'
  },
  {
    path: '/profile'
  },
  {
    path: '/account'
  },
  {
    path: '/statistic'
  },
  {
    path: '/calender'
  },
  {
    path: '/settings'
  },
  {
    path: '/users'
  },
]

const adminPath = [
  {
    path: '/users'
  },
]

router.beforeEach(async (to) => {

  const user = useUserStore();
  const { info, userdata } = storeToRefs(user);

  if (info.value.checkLogin == 'login') {

    // when user is login

    // for admin route, if user is not admin, redirect to dashboard page
    for (const route of adminPath) {
      if (route.path == to.path) {
        const canAccess = await canAdminAccess(userdata)
        if (!canAccess) return '/dashboard'
      }
    }
    // prevent user from accessing public route
    for (const route of publicPath) {
      if (route.path == to.path) {
        const canAccess = await canUserAccess(info)
        if (canAccess) return '/dashboard'
      }
    }
  } else {

    // when user is not login

    // prevent user from accessing private route
    for (const route of userPath) {
      if (route.path == to.path) {
        const canAccess = await canUserAccess(info)
        if (!canAccess) return '/signin'
      }
    }

    // prevent user from accessing admin route
    for (const route of adminPath) {
      if (route.path == to.path) {
        const canAccess = await canUserAccess(info)
        if (!canAccess) return '/signin'
      }
    }
  }
})

const canAdminAccess = (async (userdata) => {
  if (userdata.value.role == 'admin') {
    return true
  } else {
    return false
  }
})

const canUserAccess = (async (info) => {
  if (info.value.checkLogin == 'login') {
    return true
  } else {
    return false
  }
})

export default router
