import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import Login from '@/views/Login.vue';
import auth from '@/services/auth';
import AuthSuccess from '@/views/AuthSuccess.vue';
import CerereCretalii from '../views/CerereCretalii.vue'
import CerereDuplicat from '../views/CerereDuplicat.vue'
import ConfirmareCerere from '../views/ConfirmareCerere.vue'
import MDeliveryPayment from '@/views/MDeliveryPayment.vue'
import MPayPayment from '@/views/MPayPayment.vue'; 
import PaymentSuccess from '@/views/PaymentSuccess.vue';
import AnimalDetails from '@/views/AnimalDetails.vue';
import AdminPanel from '@/views/AdminPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/auth-success',
    name: 'AuthSuccess',
    component: AuthSuccess
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
    path: '/cerere-duplicat',
    name: 'cerere-duplicat',
    component: CerereDuplicat
  },
  {
    path: '/mpay',
    name: 'MPayPayment',
    component: MPayPayment
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess
  },
  {
    path: '/mdelivery-payment',
    name: 'MDeliveryPayment',
    component: MDeliveryPayment
  },
  {
    path: '/animal-details',
    name: 'AnimalDetails',
    component: AnimalDetails,
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel
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
