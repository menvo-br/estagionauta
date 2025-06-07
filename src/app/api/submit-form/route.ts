
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Extract form data
    const {
      step1,
      step2,
      variant,
      timestamp,
      sourceParam = 'direct'
    } = formData

    // Create event attendee record
    const { data: attendee, error: attendeeError } = await supabaseAdmin
      .from('event_attendees')
      .insert({
        email: step1.email,
        full_name: step1.fullName,
        source_param: sourceParam,
        form_data: {
          step1,
          step2,
          variant,
          timestamp
        }
      })
      .select()
      .single()

    if (attendeeError) {
      console.error('Attendee creation error:', attendeeError)
      throw attendeeError
    }

    return NextResponse.json({ 
      success: true, 
      attendeeId: attendee.id,
      message: 'Form submitted successfully'
    })

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
