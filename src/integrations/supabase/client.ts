
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
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        update: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        delete: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        single: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        maybeSingle: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
      }),
      functions: {
        invoke: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
      },
    }
  }
  
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
})()
