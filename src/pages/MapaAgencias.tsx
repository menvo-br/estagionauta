
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { AddAgencyModal } from '@/components/agency/AddAgencyModal'
import { AgencyFilters, FilterState } from '@/components/agency/AgencyFilters'
import { MapPin, Star, Phone, Globe, Building, Users, Plus } from 'lucide-react'

interface Agency {
  id: string
  name: string
  description: string | null
  email: string | null
  phone: string | null
  website: string | null
  city: string | null
  state: string | null
  areas: string[] | null
  is_verified: boolean
  rating: number | null
  total_reviews: number | null
}

export default function MapaAgenciasPage() {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchAgencies()
  }, [])

  const fetchAgencies = async () => {
    try {
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .eq('status', 'approved')
        .eq('is_verified', true)
        .order('rating', { ascending: false })

      if (error) throw error

      setAgencies(data || [])
      setFilteredAgencies(data || [])
    } catch (error: any) {
      toast({
        title: "Erro ao carregar agências",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = [...agencies]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(agency => 
        agency.name.toLowerCase().includes(searchLower) ||
        agency.description?.toLowerCase().includes(searchLower) ||
        agency.areas?.some(area => area.toLowerCase().includes(searchLower))
      )
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(agency => 
        agency.city?.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    // State filter
    if (filters.state) {
      filtered = filtered.filter(agency => agency.state === filters.state)
    }

    // Areas filter
    if (filters.areas.length > 0) {
      filtered = filtered.filter(agency => 
        agency.areas?.some(area => 
          filters.areas.some(filterArea => 
            area.toLowerCase().includes(filterArea.toLowerCase())
          )
        )
      )
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(agency => 
        (agency.rating || 0) >= filters.minRating
      )
    }

    // Verified only filter
    if (filters.verifiedOnly) {
      filtered = filtered.filter(agency => agency.is_verified)
    }

    setFilteredAgencies(filtered)
  }

  const stats = {
    totalAgencies: agencies.length,
    totalReviews: agencies.reduce((sum, agency) => sum + (agency.total_reviews || 0), 0),
    averageRating: agencies.length > 0 
      ? agencies.reduce((sum, agency) => sum + (agency.rating || 0), 0) / agencies.length 
      : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Carregando agências...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Mapa de Agências de Estágio 🗺️
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra e avalie agências de estágio na sua região. Veja avaliações reais de outros estudantes.
          </p>
        </div>

        {/* Statistics */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalAgencies}</p>
                  <p className="text-muted-foreground">Agências verificadas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalReviews}</p>
                  <p className="text-muted-foreground">Avaliações</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                  <p className="text-muted-foreground">Média geral</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Agency Button */}
        {user && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-end">
            <Button onClick={() => setShowAddModal(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Agência</span>
            </Button>
          </div>
        )}

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <AgencyFilters 
            onFiltersChange={handleFiltersChange}
            totalAgencies={filteredAgencies.length}
          />
        </div>

        {/* Agencies List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredAgencies.map((agency) => (
              <Card key={agency.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{agency.name}</span>
                        {agency.is_verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            ✓ Verificada
                          </Badge>
                        )}
                      </CardTitle>
                      {agency.description && (
                        <CardDescription className="mt-2">
                          {agency.description}
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-right">
                      {agency.rating && (
                        <>
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{agency.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {agency.total_reviews} avaliações
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Location */}
                    {(agency.city || agency.state) && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {[agency.city, agency.state].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Areas */}
                    {agency.areas && agency.areas.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Áreas de atuação:</p>
                        <div className="flex flex-wrap gap-2">
                          {agency.areas.map((area, index) => (
                            <Badge key={index} variant="outline">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                        {agency.phone && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{agency.phone}</span>
                          </div>
                        )}
                        {agency.website && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <span>{agency.website}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Ver Perfil
                        </Button>
                        <Button size="sm">
                          Avaliar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAgencies.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma agência encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou termos de busca.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add Agency Modal */}
        <AddAgencyModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onAgencyAdded={fetchAgencies}
        />
      </div>
    </div>
  )
}
