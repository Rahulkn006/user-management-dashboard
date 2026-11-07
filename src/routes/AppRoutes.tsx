
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import UserListPage from '../pages/UserListPage'
import NotFoundPage from '../pages/NotFoundPage'

const UserDetailPage = lazy(
  () => import('../pages/UserDetailPage')
)

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserListPage />} />

      <Route
        path="/users/:id"
        element={
          <Suspense fallback={<p className="p-8 text-center">Loading profile...</p>}>
            <UserDetailPage />
          </Suspense>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
