import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

// Helper function to resolve params (Next.js 15 compatibility)
async function resolveParams(params: Promise<{ slug: string }> | { slug: string }): Promise<{ slug: string }> {
  return await Promise.resolve(params)
}

// Helper function to get or create page
async function getOrCreatePage(slug: string) {
  const pageDisplayNames: Record<string, string> = {
    'mittelstand': 'Mittelstand',
    'immobilien-bau': 'Immobilien & Bau',
    'corporate-high-end': 'Corporate High-End',
    'agentur-partner': 'Agentur & Partner',
  }

  let { data: page, error: pageError } = await supabaseAdmin
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .single()

  // If page doesn't exist, create it
  if (pageError || !page) {
    const { data: newPage, error: createError } = await supabaseAdmin
      .from('pages')
      .insert({
        slug,
        title: pageDisplayNames[slug] || slug,
        description: `Landing Page für ${pageDisplayNames[slug] || slug}`,
        is_active: true,
      })
      .select('id')
      .single()

    if (createError || !newPage) {
      throw new Error('Failed to create page')
    }
    
    return newPage
  }
  
  return page
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await resolveParams(params)
    const slug = resolvedParams.slug

    // Input validation
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      )
    }

    // Get or create page by slug
    const page = await getOrCreatePage(slug)

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

    return NextResponse.json(sectionKey ? (data[0]?.content || null) : data)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in GET /api/admin/pages/[slug]/sections:', errorMessage)
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await resolveParams(params)
    const slug = resolvedParams.slug

    // Input validation
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      )
    }

    // Get or create page by slug
    const page = await getOrCreatePage(slug)

    const body = await request.json()
    const { section_key, content, order_index } = body

    // Input validation
    if (!section_key || typeof section_key !== 'string') {
      return NextResponse.json(
        { error: 'section_key is required and must be a string' },
        { status: 400 }
      )
    }

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'content is required and must be an object' },
        { status: 400 }
      )
    }

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in POST /api/admin/pages/[slug]/sections:', errorMessage)
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await resolveParams(params)
    const slug = resolvedParams.slug

    // Input validation
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      )
    }

    // Get or create page by slug
    const page = await getOrCreatePage(slug)

    const body = await request.json()
    const { section_key, content, order_index } = body

    // Input validation
    if (!section_key || typeof section_key !== 'string') {
      return NextResponse.json(
        { error: 'section_key is required and must be a string' },
        { status: 400 }
      )
    }

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'content is required and must be an object' },
        { status: 400 }
      )
    }

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in PUT /api/admin/pages/[slug]/sections:', errorMessage)
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await resolveParams(params)
    const slug = resolvedParams.slug

    // Input validation
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      )
    }

    // Get or create page by slug
    const page = await getOrCreatePage(slug)

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in DELETE /api/admin/pages/[slug]/sections:', errorMessage)
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    )
  }
}

