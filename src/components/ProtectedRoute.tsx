import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Section from './Section'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const location = useLocation()
  const { session, isLoading, isSupabaseConfigured } = useAuth()

  if (!isSupabaseConfigured) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <div className="space-y-3 text-sm text-brand-neutral">
          <p className="font-semibold text-brand-primary">Supabase configuration is missing.</p>
          <p>
            Set <code className="rounded bg-surface-muted px-2 py-0.5">VITE_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-surface-muted px-2 py-0.5">VITE_SUPABASE_ANON_KEY</code> in your environment to
            access admin tools.
          </p>
        </div>
      </Section>
    )
  }

  if (isLoading) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <p className="text-sm text-brand-neutral">Checking credentials...</p>
      </Section>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
