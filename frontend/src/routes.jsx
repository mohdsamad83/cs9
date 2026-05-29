import Landing from './pages/landing'
import AdminHome from './pages/admin'
import UserHome from './pages/user'

export const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/user',
    element: <UserHome />,
  },
]
