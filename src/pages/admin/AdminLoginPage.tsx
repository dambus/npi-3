import { type FormEvent, useState } from 'react'
import { Navigate, useLocation, type Location } from 'react-router-dom'
import Button from '../../components/Button'
import FormField from '../../components/FormField'
import Section from '../../components/Section'
import { useAuth } from '../../hooks/useAuth'

export function AdminLoginPage() {
  const location = useLocation()
  const { session, signInWithPassword, lastError, isLoading, isSupabaseConfigured } = useAuth()

  const redirectFrom = (location.state as { from?: Location } | null)?.from
  const redirectTo = redirectFrom
    ? `${redirectFrom.pathname}${redirectFrom.search ?? ''}${redirectFrom.hash ?? ''}`
    : '/admin/projects'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (session) {
    return <Navigate to={redirectTo} replace />
  }

  if (!isSupabaseConfigured) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <div className="space-y-4 text-sm text-brand-neutral">
          <h1 className="font-display text-3xl font-semibold text-brand-primary">Admin login</h1>
          <p>
            Supabase environment variables are missing. Define{' '}
            <code className="rounded bg-surface-muted px-2 py-0.5">VITE_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-surface-muted px-2 py-0.5">VITE_SUPABASE_ANON_KEY</code> in your `.env` file and
            rebuild the app.
          </p>
        </div>
      </Section>
    )
  }

  const errorMessage = formError ?? lastError?.message ?? null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const { error } = (await signInWithPassword({ email, password })) ?? {}
      if (error) {
        setFormError(error.message)
      } else {
        setSuccessMessage('Signed in successfully. Redirecting...')
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to sign in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section align="left" className="bg-surface-default py-24">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-brand-neutral/15 bg-white p-8 shadow-[0_28px_65px_rgba(8,20,44,0.12)]">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">
            Admin access
          </p>
          <h1 className="font-display text-3xl font-semibold text-brand-primary">Sign in</h1>
          <p className="text-sm text-brand-neutral">
            Use your Supabase credentials. After signing in, you will be redirected to the project dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage ? (
            <p className="text-sm text-feedback-danger" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-brand-secondary" role="status">
              {successMessage}
            </p>
          ) : null}

          <Button
            as="button"
            type="submit"
            className="w-full justify-center"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </Section>
  )
}

export default AdminLoginPage
