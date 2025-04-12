import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CerereCretalii from '../views/CerereCretalii.vue'
import ConfirmareCerere from '../views/ConfirmareCerere.vue'
import DigitalForm from '@/views/DigitalForm.vue'
import CerereDuplicat from '../views/CerereDuplicat.vue'

const routes = [
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router