import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      // Get single page with sections
      const { data: page, error: pageError } = await supabaseAdmin
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single()

      if (pageError) throw pageError

      const { data: sections, error: sectionsError } = await supabaseAdmin
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .order('order_index', { ascending: true })

      if (sectionsError) throw sectionsError

      return NextResponse.json({ ...page, sections })
    } else {
      // Get all pages
      const { data, error } = await supabaseAdmin
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return NextResponse.json(data)
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, description, sections } = body

    // Create or update page
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .upsert({
        slug,
        title,
        description,
      }, {
        onConflict: 'slug'
      })
      .select()
      .single()

    if (pageError) throw pageError

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      for (const section of sections) {
        await supabaseAdmin
          .from('page_sections')
          .upsert({
            page_id: page.id,
            section_key: section.section_key,
            content: section.content,
            order_index: section.order_index || 0,
          }, {
            onConflict: 'page_id,section_key'
          })
      }
    }

    return NextResponse.json(page)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, slug, title, description, is_active } = body

    const { data, error } = await supabaseAdmin
      .from('pages')
      .update({
        slug,
        title,
        description,
        is_active,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('pages')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

