import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/services/auth';
import Login from '@/views/Login.vue';

import HomePage from '../views/HomePage.vue'
import CerereCretalii from '../views/CerereCretalii.vue'
import ConfirmareCerere from '../views/ConfirmareCerere.vue'
import DigitalForm from '@/views/DigitalForm.vue'
import CerereDuplicat from '../views/CerereDuplicat.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/cerere-crotalii',
    name: 'CerereCretalii',
    component: CerereCretalii
  },
  {
    path: '/confirmare-cerere',
    name: 'ConfirmareCerere',
    component: ConfirmareCerere
  },
  {
    path: '/digital-form',
    name: 'DigitalForm',
    component: DigitalForm
  },
  {
    path: '/cerere-duplicat',
    name: 'cerere-duplicat',
    component: CerereDuplicat
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.checkAuth();
  const isPublicRoute = to.matched.some(record => record.meta.public);

  if (!isAuthenticated && !isPublicRoute) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router