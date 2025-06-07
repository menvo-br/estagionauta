
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Globe, Phone, Mail, Construction } from 'lucide-react'

export default function MapaAgenciasPage() {
  // Mock data - will be replaced with real data from Supabase
  const agencies = [
    {
      id: 1,
      name: 'CIEE Pernambuco',
      description: 'Centro de Integração Empresa-Escola, uma das maiores organizações de estágio do Brasil',
      rating: 4.5,
      totalReviews: 156,
      areas: ['Todas as áreas'],
      address: 'Rua da Aurora, 463 - Boa Vista, Recife - PE',
      website: 'https://www.ciee.org.br',
      phone: '(81) 3423-7700',
      isVerified: true
    },
    {
      id: 2,
      name: 'IEL - Instituto Euvaldo Lodi',
      description: 'Instituição do Sistema Federação das Indústrias focada em estágios industriais',
      rating: 4.2,
      totalReviews: 89,
      areas: ['Engenharia', 'Tecnologia', 'Indústria'],
      address: 'Av. Cruz Cabugá, 1200 - Santo Amaro, Recife - PE',
      website: 'https://www.iel.org.br',
      phone: '(81) 3416-9999',
      isVerified: true
    },
    {
      id: 3,
      name: 'Nube - Núcleo Brasileiro de Estágios',
      description: 'Organização nacional especializada em programas de estágio e trainee',
      rating: 4.1,
      totalReviews: 203,
      areas: ['Administração', 'Marketing', 'Vendas'],
      address: 'Rua do Hospício, 81 - Boa Vista, Recife - PE',
      website: 'https://www.nube.com.br',
      phone: '(81) 3421-8888',
      isVerified: true
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mapa de Agências de Estágio</h1>
        <p className="text-muted-foreground max-w-3xl">
          Descubra e avalie agências de estágio na sua região. Veja avaliações de outros estudantes 
          e encontre a melhor opção para sua área de interesse.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-3">
          <Construction className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Funcionalidade em Desenvolvimento
            </h3>
            <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">
              O mapa interativo e sistema de avaliações estão sendo desenvolvidos. 
              Por enquanto, confira nossa lista das principais agências de estágio em Recife.
            </p>
          </div>
        </div>
      </div>

      {/* Agencies List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {agencies.map((agency) => (
          <Card key={agency.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-xl">{agency.name}</CardTitle>
                    {agency.isVerified && (
                      <Badge variant="outline" className="text-green-600">
                        ✓ Verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(agency.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {agency.rating} ({agency.totalReviews} avaliações)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                {agency.description}
              </CardDescription>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{agency.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{agency.phone}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={agency.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {agency.website}
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Áreas de atuação:</p>
                <div className="flex flex-wrap gap-2">
                  {agency.areas.map((area, index) => (
                    <Badge key={index} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" disabled>
                  Ver no Mapa (Em breve)
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Ver Avaliações (Em breve)
                </Button>
                <Button size="sm" asChild>
                  <a href={agency.website} target="_blank" rel="noopener noreferrer">
                    Visitar Site
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Conhece outras agências?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ajude outros estudantes! Se você conhece uma boa agência de estágio que não está na nossa lista, 
          nos envie as informações e avaliaremos para incluir.
        </p>
        <Button asChild>
          <a href="mailto:contato@estagionauta.com.br?subject=Sugestão de Agência">
            Sugerir Agência
          </a>
        </Button>
      </div>
    </div>
  )
}
