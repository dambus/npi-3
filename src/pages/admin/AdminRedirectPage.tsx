import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * Redirects `/admin` visitors to either the login screen (no session)
 * or the project dashboard (active session). Helps avoid blank pages or 404.
 */
export function AdminRedirectPage() {
  const location = useLocation()
  const { session, isSupabaseConfigured } = useAuth()

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />
  }

  if (session) {
    return <Navigate to="/admin/projects" replace />
  }

  return <Navigate to="/admin/login" state={{ from: location }} replace />
}

export default AdminRedirectPage

