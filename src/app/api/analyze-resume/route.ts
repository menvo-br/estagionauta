
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabaseAdmin } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File
    const attendeeId = formData.get('attendeeId') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Extract text from PDF (you'd need a PDF parser here)
    // For now, we'll simulate with the filename
    const resumeText = `Resume content for analysis: ${file.name}`

    // Create prompt for OpenAI
    const prompt = `
Você é um analista de carreira especializado em estágios universitários. Avalie o currículo a seguir e forneça uma análise detalhada.

Currículo:
${resumeText}

Forneça sua resposta em formato JSON com a seguinte estrutura:
{
  "nota_geral": 7.5,
  "notas_detalhadas": {
    "organizacao": 8,
    "ortografia": 9,
    "experiencias": 6,
    "adequacao_nivel": 7,
    "extracurriculares": 5,
    "diferencial": 6,
    "habilidades_tecnicas": 7
  },
  "pontos_fortes": [
    "Boa estruturação do currículo",
    "Experiência relevante em projetos"
  ],
  "pontos_melhorar": [
    "Incluir mais atividades extracurriculares",
    "Melhorar descrição das experiências"
  ],
  "recomendacoes": [
    "Use verbos de ação para descrever suas experiências",
    "Inclua um resumo profissional no topo"
  ],
  "observacoes_gerais": "Currículo promissor com potencial para melhorias significativas..."
}
`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em análise de currículos para estágios universitários. Forneça análises construtivas e precisas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const analysisText = completion.choices[0]?.message?.content
    
    if (!analysisText) {
      throw new Error('No analysis generated')
    }

    // Parse the JSON response
    const analysisData = JSON.parse(analysisText)

    // Save to database
    const { data: analysis, error } = await supabaseAdmin
      .from('curriculum_analysis')
      .insert({
        attendee_id: attendeeId,
        analysis_data: analysisData,
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      analysis: analysisData,
      id: analysis.id 
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}
