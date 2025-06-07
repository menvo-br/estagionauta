
'use client'

import { useState } from 'react'
import { ResumeAnalysisForm } from '@/components/forms/ResumeAnalysisForm'

export default function AnalyseCurriculoPage() {
  const handleFormComplete = (data: any) => {
    console.log('Form completed with data:', data)
    // Here you would typically send the data to your API
    // The form component already handles the redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-8">
        <ResumeAnalysisForm onComplete={handleFormComplete} />
      </div>
    </div>
  )
}
