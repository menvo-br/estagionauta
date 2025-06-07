
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, ArrowLeft, ArrowRight, Gift } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'

// A/B Test variant detection
const useABVariant = () => {
  const searchParams = useSearchParams()
  const variant = searchParams.get('variant')
  
  // If no variant specified, randomly assign one
  if (!variant) {
    return Math.random() < 0.5 ? 'menvo' : 'career'
  }
  
  return variant as 'menvo' | 'career'
}

const step1Schema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  course: z.string().min(2, 'Curso é obrigatório'),
  university: z.string().min(2, 'Universidade é obrigatória'),
  period: z.enum(['1-2', '3-5', '6+', 'formado']),
  hasInternship: z.enum(['sim', 'nao', 'procurando']),
  linkedinUrl: z.string().optional()
})

const step2MenvoSchema = z.object({
  knowsAboutMentorship: z.enum(['sim', 'nao', 'ja-ouvi']),
  interestInMentorship: z.enum(['sim-certeza', 'talvez', 'nao']),
  whatIsMenvo: z.string().min(10, 'Por favor, explique o que entendeu sobre o Menvo'),
  mentoringTopics: z.string().min(10, 'Descreva sobre o que gostaria de conversar'),
  howFoundMenvo: z.enum(['upe-destaca', 'amigo', 'instagram', 'linkedin', 'outro']),
  feedbackMenvo: z.string().optional()
})

const step2CareerSchema = z.object({
  careerGoals: z.string().min(10, 'Descreva seus objetivos de carreira'),
  mainChallenges: z.string().min(10, 'Quais são seus principais desafios?'),
  areasOfInterest: z.array(z.string()).min(1, 'Selecione pelo menos uma área'),
  experienceLevel: z.enum(['iniciante', 'intermediario', 'avancado']),
  needsMentorship: z.enum(['sim', 'talvez', 'nao']),
  mentoringStyle: z.enum(['individual', 'grupo', 'workshops', 'qualquer'])
})

const step3Schema = z.object({
  resume: z.instanceof(File, { message: 'Currículo é obrigatório' })
})

type Step1Data = z.infer<typeof step1Schema>
type Step2MenvoData = z.infer<typeof step2MenvoSchema>
type Step2CareerData = z.infer<typeof step2CareerSchema>
type Step3Data = z.infer<typeof step3Schema>

interface ResumeAnalysisFormProps {
  onComplete: (data: any) => void
}

export function ResumeAnalysisForm({ onComplete }: ResumeAnalysisFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const variant = useABVariant()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  // Forms for each step
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1 || {}
  })

  const step2Form = useForm<Step2MenvoData | Step2CareerData>({
    resolver: zodResolver(variant === 'menvo' ? step2MenvoSchema : step2CareerSchema),
    defaultValues: formData.step2 || {}
  })

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData.step3 || {}
  })

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      step3Form.setValue('resume', file)
      step3Form.clearErrors('resume')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  })

  const nextStep = async () => {
    let isValid = false
    let stepData = {}

    if (currentStep === 1) {
      isValid = await step1Form.trigger()
      if (isValid) {
        stepData = step1Form.getValues()
      }
    } else if (currentStep === 2) {
      isValid = await step2Form.trigger()
      if (isValid) {
        stepData = step2Form.getValues()
      }
    }

    if (isValid) {
      setFormData(prev => ({ ...prev, [`step${currentStep}`]: stepData }))
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const onSubmit = async (data: Step3Data) => {
    setIsSubmitting(true)
    
    try {
      const completeData = {
        ...formData,
        step3: data,
        variant,
        timestamp: new Date().toISOString()
      }

      // Here you would typically send to your API
      console.log('Form submitted:', completeData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onComplete(completeData)
      router.push('/analise-curriculo/sucesso')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Gift className="h-8 w-8 text-purple-600 mr-2" />
          <h1 className="text-3xl font-bold">Análise Gratuita de Currículo</h1>
        </div>
        <p className="text-muted-foreground">
          Receba uma análise detalhada do seu currículo com dicas personalizadas da nossa IA
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progresso</span>
          <span className="text-sm text-muted-foreground">{currentStep} de {totalSteps}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Informações Básicas</h2>
              
              <Form {...step1Form}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={step1Form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curso *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Engenharia da Computação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Universidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: UPE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={step1Form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Período do curso *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1-2" id="1-2" />
                            <label htmlFor="1-2">1º ao 2º período</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3-5" id="3-5" />
                            <label htmlFor="3-5">3º ao 5º período</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="6+" id="6+" />
                            <label htmlFor="6+">6º período em diante</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="formado" id="formado" />
                            <label htmlFor="formado">Formado há até 1 ano</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="hasInternship"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Você já fez estágio? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="sim" />
                            <label htmlFor="sim">Sim</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="nao" />
                            <label htmlFor="nao">Não</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="procurando" id="procurando" />
                            <label htmlFor="procurando">Estou procurando</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/seuperfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>

              <Button onClick={nextStep} className="w-full">
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                {variant === 'menvo' ? 'Sobre Mentoria e o Menvo' : 'Seus Objetivos de Carreira'}
              </h2>
              
              <Form {...step2Form}>
                {variant === 'menvo' ? (
                  <>
                    <FormField
                      control={step2Form.control}
                      name="whatIsMenvo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>O que você entendeu sobre o Menvo? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Conte o que você entendeu sobre nossa plataforma..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="mentoringTopics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Se pudesse conversar com alguém mais experiente, sobre o quê seria? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ex: Como conseguir meu primeiro estágio, como melhorar meu currículo..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="knowsAboutMentorship"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Você já participou de algum programa de mentoria? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sim" id="mentoria-sim" />
                                <label htmlFor="mentoria-sim">Sim</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nao" id="mentoria-nao" />
                                <label htmlFor="mentoria-nao">Não</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ja-ouvi" id="mentoria-ouvi" />
                                <label htmlFor="mentoria-ouvi">Já ouvi falar, mas nunca participei</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="interestInMentorship"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Teria interesse em participar de mentorias gratuitas? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sim-certeza" id="interesse-sim" />
                                <label htmlFor="interesse-sim">Sim, com certeza</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="talvez" id="interesse-talvez" />
                                <label htmlFor="interesse-talvez">Talvez</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nao" id="interesse-nao" />
                                <label htmlFor="interesse-nao">Não tenho interesse</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="howFoundMenvo"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Como ficou sabendo do Menvo? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upe-destaca" id="upe-destaca" />
                                <label htmlFor="upe-destaca">Evento UPE Destaca</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="amigo" id="amigo" />
                                <label htmlFor="amigo">Indicação de amigo</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="instagram" id="instagram" />
                                <label htmlFor="instagram">Instagram</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="linkedin" id="linkedin" />
                                <label htmlFor="linkedin">LinkedIn</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="outro" id="outro" />
                                <label htmlFor="outro">Outro</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="feedbackMenvo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>O que achou da ideia do Menvo? (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Suas impressões e sugestões são muito importantes para nós!"
                              className="min-h-[60px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <FormField
                      control={step2Form.control}
                      name="careerGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quais são seus principais objetivos de carreira? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ex: Conseguir um estágio em uma empresa de tecnologia, desenvolver habilidades de liderança..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="mainChallenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quais são seus principais desafios atualmente? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ex: Falta de experiência, dificuldade para fazer networking, insegurança em entrevistas..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="areasOfInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Áreas de interesse *</FormLabel>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              'Tecnologia', 'Marketing', 'Finanças', 'Recursos Humanos',
                              'Design', 'Vendas', 'Engenharia', 'Educação',
                              'Saúde', 'Direito', 'Empreendedorismo', 'Outro'
                            ].map((area) => (
                              <div key={area} className="flex items-center space-x-2">
                                <Checkbox
                                  id={area}
                                  checked={field.value?.includes(area) || false}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || []
                                    if (checked) {
                                      field.onChange([...currentValue, area])
                                    } else {
                                      field.onChange(currentValue.filter(v => v !== area))
                                    }
                                  }}
                                />
                                <label htmlFor={area} className="text-sm">{area}</label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Como você avalia seu nível de experiência? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="iniciante" id="iniciante" />
                                <label htmlFor="iniciante">Iniciante (pouca ou nenhuma experiência)</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="intermediario" id="intermediario" />
                                <label htmlFor="intermediario">Intermediário (alguma experiência)</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="avancado" id="avancado" />
                                <label htmlFor="avancado">Avançado (bastante experiência)</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="needsMentorship"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Uma mentoria poderia te ajudar a alcançar seus objetivos? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sim" id="mentoria-sim-career" />
                                <label htmlFor="mentoria-sim-career">Sim, com certeza</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="talvez" id="mentoria-talvez-career" />
                                <label htmlFor="mentoria-talvez-career">Talvez</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nao" id="mentoria-nao-career" />
                                <label htmlFor="mentoria-nao-career">Não acredito que me ajudaria</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="mentoringStyle"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Que tipo de mentoria seria mais interessante para você? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="individual" id="individual" />
                                <label htmlFor="individual">Conversas individuais com mentor</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="grupo" id="grupo" />
                                <label htmlFor="grupo">Sessões em grupo</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="workshops" id="workshops" />
                                <label htmlFor="workshops">Workshops e palestras</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="qualquer" id="qualquer" />
                                <label htmlFor="qualquer">Qualquer formato</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </Form>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button onClick={nextStep} className="flex-1">
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Upload do Currículo</h2>
              <p className="text-muted-foreground">
                Agora anexe seu currículo para receber uma análise detalhada com dicas personalizadas!
              </p>
              
              <Form {...step3Form}>
                <form onSubmit={step3Form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={step3Form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currículo (PDF, máx. 5MB) *</FormLabel>
                        <FormControl>
                          <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                              isDragActive 
                                ? 'border-primary bg-primary/5' 
                                : 'border-muted-foreground/25 hover:border-primary/50'
                            }`}
                          >
                            <input {...getInputProps()} />
                            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                            {field.value ? (
                              <div className="space-y-2">
                                <FileText className="h-8 w-8 mx-auto text-green-600" />
                                <p className="font-medium">{field.value.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(field.value.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-lg font-medium">
                                  {isDragActive 
                                    ? 'Solte o arquivo aqui...' 
                                    : 'Arraste seu currículo aqui ou clique para selecionar'
                                  }
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Apenas arquivos PDF até 5MB
                                </p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Gift className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                          Seu presente está quase pronto! 🎁
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-200">
                          Após o envio, você receberá por email uma análise completa do seu currículo 
                          com nota em diferentes critérios e dicas personalizadas para melhorar.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Finalizar Análise
                          <Gift className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* A/B Test indicator (for development/testing) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded text-xs">
          Variant: {variant}
        </div>
      )}
    </div>
  )
}
