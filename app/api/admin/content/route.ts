import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    let query = supabaseAdmin.from('page_content').select('*')

    if (section) {
      query = query.eq('page_section', section)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(section ? (data[0] || null) : data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page_section, content } = body

    // Input validation
    if (!page_section || typeof page_section !== 'string' || page_section.trim().length === 0) {
      return NextResponse.json(
        { error: 'page_section is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'content is required and must be an object' },
        { status: 400 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Saving content for section: ${page_section}`)
    }

    const { data, error } = await supabaseAdmin
      .from('page_content')
      .upsert({
        page_section,
        content,
      }, {
        onConflict: 'page_section'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Successfully saved content for section: ${page_section}`)
    }

    return NextResponse.json(data)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error && 'details' in error ? (error as any).details : null
    
    console.error('Error in POST /api/admin/content:', errorMessage)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? errorDetails || errorMessage : null
    }, { status: 500 })
  }
}















