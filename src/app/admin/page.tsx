
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Download,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

// Mock data - in a real app, this would come from your API
const mockStats = {
  totalUsers: 342,
  totalSubmissions: 128,
  pendingAnalysis: 12,
  completedAnalysis: 116,
  averageRating: 7.2,
  conversionRate: 23.4
}

const mockSubmissions = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana@email.com',
    course: 'Engenharia da Computação',
    university: 'UPE',
    variant: 'menvo',
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00',
    source: 'upe_destaca'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    course: 'Administração',
    university: 'UFPE',
    variant: 'career',
    status: 'completed',
    submittedAt: '2024-01-14T15:20:00',
    source: 'instagram'
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    course: 'Design',
    university: 'UNICAP',
    variant: 'menvo',
    status: 'analyzing',
    submittedAt: '2024-01-14T09:15:00',
    source: 'amigo'
  }
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>
      case 'analyzing':
        return <Badge variant="default"><BarChart3 className="h-3 w-3 mr-1" />Analisando</Badge>
      case 'completed':
        return <Badge variant="outline" className="text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Concluído</Badge>
      default:
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Erro</Badge>
    }
  }

  const getVariantBadge = (variant: string) => {
    return variant === 'menvo' 
      ? <Badge className="bg-purple-100 text-purple-800">Menvo</Badge>
      : <Badge className="bg-blue-100 text-blue-800">Career</Badge>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Gerencie submissões, análises e monitore o desempenho da plataforma
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="submissions">Submissões</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde o último mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissões Totais</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  +8% desde o último mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.pendingAnalysis}</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando análise
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.averageRating}/10</div>
                <p className="text-xs text-muted-foreground">
                  Currículos analisados
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas submissões e análises realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {submission.course} - {submission.university}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getVariantBadge(submission.variant)}
                      {getStatusBadge(submission.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Submissões de Currículo</CardTitle>
                <CardDescription>
                  Gerencie todas as submissões e análises de currículo
                </CardDescription>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{submission.name}</h3>
                        {getVariantBadge(submission.variant)}
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{submission.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.course} - {submission.university}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submetido em {new Date(submission.submittedAt).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Origem: {submission.source}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      {submission.status === 'pending' && (
                        <Button size="sm">
                          Processar Análise
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão A/B</CardTitle>
                <CardDescription>
                  Comparação entre as variantes do formulário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Variante Menvo</span>
                    <span className="font-medium">24.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '24.8%'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Variante Career</span>
                    <span className="font-medium">22.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '22.1%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>
                  De onde vêm nossos usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">UPE Destaca</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Instagram</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Indicação</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">LinkedIn</span>
                    <span className="font-medium">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>
                Gerencie configurações gerais da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API OpenAI</label>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Conectado e funcionando</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Supabase Database</label>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Conectado e funcionando</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Service</label>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Configuração pendente</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
