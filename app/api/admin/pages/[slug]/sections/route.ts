import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', params.slug)
      .single()

    if (pageError) throw pageError

    const { searchParams } = new URL(request.url)
    const sectionKey = searchParams.get('section_key')

    let query = supabaseAdmin
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .order('order_index', { ascending: true })

    if (sectionKey) {
      query = query.eq('section_key', sectionKey)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(sectionKey ? (data[0] || null) : data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', params.slug)
      .single()

    if (pageError) throw pageError

    const body = await request.json()
    const { section_key, content, order_index } = body

    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .upsert({
        page_id: page.id,
        section_key,
        content,
        order_index: order_index || 0,
      }, {
        onConflict: 'page_id,section_key'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', params.slug)
      .single()

    if (pageError) throw pageError

    const body = await request.json()
    const { section_key, content, order_index } = body

    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .update({
        content,
        order_index: order_index !== undefined ? order_index : undefined,
      })
      .eq('page_id', page.id)
      .eq('section_key', section_key)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', params.slug)
      .single()

    if (pageError) throw pageError

    const { searchParams } = new URL(request.url)
    const sectionKey = searchParams.get('section_key')

    if (!sectionKey) {
      return NextResponse.json({ error: 'section_key required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)
      .eq('section_key', sectionKey)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

