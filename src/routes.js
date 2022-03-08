import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Leads = React.lazy(() => import('./views/Leads'))
const Reporting = React.lazy(() => import('./views/Reporting'))
const Users = React.lazy(() => import('./views/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/leads', name: 'Leads', component: Leads, exact: true },
  { path: '/reporting', name: 'Reporting', component: Reporting },
  { path: '/users', name: 'Users', component: Users },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
