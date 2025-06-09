
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY)
}

// Cliente Supabase com fallback
export const supabase = (() => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não está configurado. Algumas funcionalidades estarão desabilitadas.')
    // Retorna um objeto mock para evitar erros
    return {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        eq: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        maybeSingle: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
      }),
      functions: {
        invoke: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        })
      },
    }
  }
  
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
})()
