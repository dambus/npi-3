import type { AuthError, AuthResponse, Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'

export type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextValue = {
  session: Session | null
  user: User | null
  isLoading: boolean
  lastError: AuthError | null
  signInWithPassword: (credentials: SignInCredentials) => Promise<AuthResponse | null>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  isSupabaseConfigured: boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
