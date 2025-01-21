import { createRouter, createWebHistory } from 'vue-router'
import ViewConnections from '@/views/ViewConnections.vue'
import CreateConnection from '@/views/CreateConnection.vue'
import ViewConnection from '@/views/ViewConnection.vue'
import UpdateConnection from '@/views/UpdateConnection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connections',
      name: 'connections',
      component: ViewConnections,
    },
    {
      path: '/create-connection',
      name: 'create-connection',
      component: CreateConnection,
    },
    {
      path: '/view-connection/:id',
      name: 'view-connection',
      component: ViewConnection,
    },
    {
      path: '/update-connection/:id',
      name: 'update-connection',
      component: UpdateConnection,
    },
    {
      path: '/notify',
      name: 'notify',
      component: () => import('@/views/NotifyView.vue'),
    },
    {
      path: '/view-notification',
      name: 'view-notification',
      component: () => import('@/views/ViewNotification.vue'),
    },
  ],
})

export default router
