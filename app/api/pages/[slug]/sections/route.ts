import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Handle both sync and async params (Next.js 15 compatibility)
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (pageError || !page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const sectionKey = searchParams.get('section_key')

    let query = supabaseAdmin
      .from('page_sections')
      .select('section_key, content, order_index')
      .eq('page_id', page.id)
      .order('order_index', { ascending: true })

    if (sectionKey) {
      query = query.eq('section_key', sectionKey)
    }

    const { data, error } = await query

    if (error) throw error

    if (sectionKey) {
      return NextResponse.json(data?.[0]?.content || null)
    }

    // Convert to object
    const sectionsObj: Record<string, any> = {}
    data?.forEach((section) => {
      sectionsObj[section.section_key] = section.content
    })

    return NextResponse.json(sectionsObj)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

