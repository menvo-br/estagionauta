
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calculator, Calendar, DollarSign, FileText, Info } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const calculatorSchema = z.object({
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  stipendValue: z.string().min(1, 'Valor da bolsa é obrigatório'),
  workingDays: z.enum(['5', '6'], {
    required_error: 'Selecione os dias trabalhados por semana'
  }),
  hasTransportAid: z.enum(['sim', 'nao'], {
    required_error: 'Informe se recebe auxílio transporte'
  }),
  transportValue: z.string().optional()
})

type CalculatorFormData = z.infer<typeof calculatorSchema>

interface CalculationResult {
  totalDays: number
  workingDays: number
  recessDays: number
  recessValue: number
  transportRecessValue: number
  totalRecessValue: number
}

export default function CalculadoraRecessoPage() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      workingDays: '5',
      hasTransportAid: 'nao'
    }
  })

  const watchHasTransportAid = form.watch('hasTransportAid')

  const calculateReccess = (data: CalculatorFormData) => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      const startDate = new Date(data.startDate)
      const endDate = new Date(data.endDate)
      
      // Calculate total days
      const timeDiff = endDate.getTime() - startDate.getTime()
      const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      
      // Calculate working days (simplified - in reality you'd exclude weekends and holidays)
      const workingDaysPerWeek = parseInt(data.workingDays)
      const totalWeeks = Math.floor(totalDays / 7)
      const workingDays = totalWeeks * workingDaysPerWeek
      
      // Calculate reccess days (30 days per year of internship)
      const yearsWorked = totalDays / 365
      const recessDays = Math.floor(yearsWorked * 30)
      
      // Calculate values
      const stipendValue = parseFloat(data.stipendValue.replace(',', '.'))
      const dailyStipend = stipendValue / 30 // Assuming monthly stipend
      const recessValue = recessDays * dailyStipend
      
      let transportRecessValue = 0
      if (data.hasTransportAid === 'sim' && data.transportValue) {
        const transportValue = parseFloat(data.transportValue.replace(',', '.'))
        const dailyTransport = transportValue / 30
        transportRecessValue = recessDays * dailyTransport
      }
      
      const totalRecessValue = recessValue + transportRecessValue
      
      setResult({
        totalDays,
        workingDays,
        recessDays,
        recessValue,
        transportRecessValue,
        totalRecessValue
      })
      
      setIsCalculating(false)
    }, 1000)
  }

  const onSubmit = (data: CalculatorFormData) => {
    calculateReccess(data)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Calculadora de Recesso de Estágio</h1>
          <p className="text-muted-foreground max-w-3xl">
            Calcule quantos dias de recesso você tem direito e o valor a receber. 
            Baseado na Lei 11.788/2008 que regulamenta os estágios no Brasil.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Dados do Estágio
              </CardTitle>
              <CardDescription>
                Preencha as informações do seu estágio para calcular o recesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Início</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Término</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="stipendValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Bolsa Mensal (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1500.00" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workingDays"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Quantos dias por semana você trabalha?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="5" id="5days" />
                              <Label htmlFor="5days">5 dias por semana</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="6" id="6days" />
                              <Label htmlFor="6days">6 dias por semana</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasTransportAid"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Recebe auxílio transporte?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sim" id="transport-sim" />
                              <Label htmlFor="transport-sim">Sim</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nao" id="transport-nao" />
                              <Label htmlFor="transport-nao">Não</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchHasTransportAid === 'sim' && (
                    <FormField
                      control={form.control}
                      name="transportValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor do Auxílio Transporte Mensal (R$)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="200.00" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit" className="w-full" disabled={isCalculating}>
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Recesso
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Resultado do Cálculo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold text-blue-600">{result.recessDays}</div>
                      <div className="text-sm text-muted-foreground">Dias de Recesso</div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold text-green-600">
                        R$ {result.totalRecessValue.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">Valor Total</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Período total do estágio:</span>
                      <span className="font-medium">{result.totalDays} dias</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor da bolsa em recesso:</span>
                      <span className="font-medium">R$ {result.recessValue.toFixed(2)}</span>
                    </div>
                    
                    {result.transportRecessValue > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Auxílio transporte em recesso:</span>
                        <span className="font-medium">R$ {result.transportRecessValue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full" disabled>
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar PDF (Em breve)
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Legal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Informações Legais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Lei 11.788/2008 - Art. 13:</strong> É assegurado ao estagiário, sempre que o estágio tenha duração igual ou superior a 1 (um) ano, período de recesso de 30 (trinta) dias, a ser gozado preferencialmente durante suas férias escolares.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 text-muted-foreground">
                  <p>• O recesso pode ser proporcional ao período estagiado</p>
                  <p>• Durante o recesso, o estagiário faz jus à bolsa-auxílio</p>
                  <p>• O auxílio-transporte também deve ser mantido durante o recesso</p>
                  <p>• Este cálculo é uma estimativa baseada na legislação vigente</p>
                </div>

                <p className="text-xs text-muted-foreground">
                  <strong>Importante:</strong> Sempre consulte seu contrato de estágio e tire dúvidas com a agência de estágio ou RH da empresa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
