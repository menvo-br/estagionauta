
// Environment variables validation
export const env = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL!,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY!,
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY!,
  MODE: import.meta.env.MODE || 'development',
}

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_OPENAI_API_KEY'
]

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    console.warn(`Missing environment variable: ${envVar}`)
  }
}
