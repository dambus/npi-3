import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { AuthContextValue, SignInCredentials } from './AuthContext'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthContextValue['session']>(null)
  const [user, setUser] = useState<AuthContextValue['user']>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastError, setLastError] = useState<AuthContextValue['lastError']>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      setSession(null)
      setUser(null)
      return
    }

    const client = supabase

    const initialize = async () => {
      setIsLoading(true)
      const { data, error } = await client.auth.getSession()
      if (!isMountedRef.current) return

      setLastError(error ?? null)
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    void initialize()

    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMountedRef.current) return
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const signInWithPassword = useCallback<AuthContextValue['signInWithPassword']>(
    async ({ email, password }: SignInCredentials) => {
      if (!supabase) {
        throw new Error('Supabase client is not configured')
      }
      setLastError(null)
      const response = await supabase.auth.signInWithPassword({ email, password })
      if (response?.error) {
        setLastError(response.error)
      }
      return response
    },
    [],
  )

  const signOut = useCallback<AuthContextValue['signOut']>(async () => {
    if (!supabase) {
      return
    }
    setLastError(null)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setLastError(error)
    }
  }, [])

  const refreshSession = useCallback<AuthContextValue['refreshSession']>(async () => {
    if (!supabase) return
    const { data, error } = await supabase.auth.getSession()
    if (!isMountedRef.current) return
    setLastError(error ?? null)
    setSession(data.session ?? null)
    setUser(data.session?.user ?? null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isLoading,
      lastError,
      signInWithPassword,
      signOut,
      refreshSession,
      isSupabaseConfigured: Boolean(supabase),
    }),
    [session, user, isLoading, lastError, signInWithPassword, signOut, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
