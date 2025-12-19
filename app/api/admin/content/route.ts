import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

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

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}






