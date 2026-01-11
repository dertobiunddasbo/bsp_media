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

    if (!page_section) {
      return NextResponse.json({ error: 'page_section is required' }, { status: 400 })
    }

    if (!content) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }

    console.log(`Saving content for section: ${page_section}`)

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

    console.log(`Successfully saved content for section: ${page_section}`, data)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error in POST /api/admin/content:', error)
    return NextResponse.json({ 
      error: error.message || 'Internal server error',
      details: error.details || null
    }, { status: 500 })
  }
}















