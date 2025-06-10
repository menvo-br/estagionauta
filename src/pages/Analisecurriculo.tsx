
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'
import { ResumeAnalysisForm } from '@/components/forms/ResumeAnalysisForm'

export default function Analisecurriculo() {
  const { user, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true)
    }
  }, [user, loading])

  const handleAnalysisComplete = (analysisId: string) => {
    console.log('Analysis completed:', analysisId)
    // Navegar para a página de resultado ou fazer algo com o ID da análise
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
                Análise de Currículo com IA 🤖
              </CardTitle>
              <CardDescription className="text-lg">
                Faça login para usar nossa análise inteligente de currículo
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Esta funcionalidade requer autenticação para garantir a segurança dos seus dados.
              </p>
            </CardContent>
          </Card>
        </div>

        <AuthModal
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
          title="Login necessário para análise"
          description="Para usar a análise de currículo com IA, você precisa estar logado em sua conta."
        />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ResumeAnalysisForm onComplete={handleAnalysisComplete} />
        </div>
      </div>
    </div>
  )
}
