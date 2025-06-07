
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/Header'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Estagionauta - Sua missão rumo ao estágio ideal',
  description: 'Plataforma que conecta universitários a mentores voluntários, análise de currículo com IA, mapa de agências de estágio e calculadora de recesso.',
  keywords: 'estágio, mentoria, currículo, universitários, carreira, UPE, recife',
  authors: [{ name: 'Estagionauta Team' }],
  openGraph: {
    title: 'Estagionauta - Sua missão rumo ao estágio ideal',
    description: 'Encontre mentores, analise seu currículo e descubra oportunidades de estágio',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
