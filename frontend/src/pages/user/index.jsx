import { Routes, Route } from 'react-router-dom'
import UserLayout from './layout'
import DashboardPage from './pages/Dashboard'
import RaiseQueryPage from './pages/RaiseQuery'
import QueryDetailPage from './pages/QueryDetail'
import ProfileSettingsPage from './pages/ProfileSettings'

function UserHome() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="raise-query" element={<RaiseQueryPage />} />
        <Route path="query/:queryId" element={<QueryDetailPage />} />
        <Route path="profile-settings" element={<ProfileSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default UserHome
