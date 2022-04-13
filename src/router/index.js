import { createRouter, createWebHashHistory } from 'vue-router'
import NavView from '../views/NavView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import MessageboardView from '../views/MessageboardView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomeView,
      nav: NavView
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: LoginView,
      nav: NavView
    }
  },
  {
    path: '/messageboard',
    name: 'messageboard',
    components: {
      default: MessageboardView,
      nav: NavView
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: RegisterView,
      nav: NavView
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
