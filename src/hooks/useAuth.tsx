
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { jwtDecode } from 'jwt-decode'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'agency' | 'admin' | 'moderator'
  credits: number
  subscription_status: 'free' | 'premium'
  subscription_tier: string | null
}

interface CustomJWT {
  user_role?: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  userRole: string | null
  loading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  hasRole: (role: string) => boolean
  isAdmin: () => boolean
  isModerator: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        handleAuthStateChange(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleAuthStateChange = async (session: Session | null) => {
    setSession(session)
    setUser(session?.user ?? null)
    
    if (session?.user) {
      // Extract role from JWT token using Custom Claims
      try {
        const jwt = jwtDecode<CustomJWT>(session.access_token)
        const role = jwt.user_role || 'student'
        setUserRole(role)
        
        // Fetch user profile
        await fetchProfile(session.user.id)
      } catch (error) {
        console.error('Error decoding JWT:', error)
        setUserRole('student')
        await fetchProfile(session.user.id)
      }
    } else {
      setProfile(null)
      setUserRole(null)
      setLoading(false)
    }
  }

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      if (data) {
        setProfile(data as Profile)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: any = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/`
      }
    })

    if (error) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      })
    } else if (data.user && !data.session) {
      toast({
        title: "Verifique seu email",
        description: "Um link de confirmação foi enviado para seu email. Confirme sua conta para fazer login.",
      })
    }

    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        toast({
          title: "Email não confirmado",
          description: "Verifique seu email e clique no link de confirmação antes de fazer login.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setUser(null)
      setProfile(null)
      setSession(null)
      setUserRole(null)
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...updates } : null)
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const hasRole = (role: string): boolean => {
    return userRole === role || profile?.role === role
  }

  const isAdmin = (): boolean => {
    return hasRole('admin')
  }

  const isModerator = (): boolean => {
    return hasRole('moderator') || hasRole('admin')
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    hasRole,
    isAdmin,
    isModerator,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
