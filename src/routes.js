import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Leads = React.lazy(() => import('./views/Leads'))
const Reporting = React.lazy(() => import('./views/Reporting'))
const Clients = React.lazy(() => import('./views/Clients'))
const Users = React.lazy(() => import('./views/Users'))
const Settings = React.lazy(() => import('./views/Settings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/leads', name: 'Leads', component: Leads, exact: true },
  { path: '/reporting', name: 'Reporting', component: Reporting },
  { path: '/clients', name: 'Clients', component: Clients },
  { path: '/users', name: 'Users', component: Users },
  { path: '/settings', name: 'Settings', component: Settings },
]

export default routes
