import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { decodeHtmlEntitiesServer } from '@/lib/html-utils'

/**
 * Recursively decodes HTML entities in an object
 * Handles strings, arrays, and nested objects
 */
function decodeHtmlEntitiesInObject(obj: any): any {
  if (typeof obj === 'string') {
    return decodeHtmlEntitiesServer(obj)
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => decodeHtmlEntitiesInObject(item))
  }
  
  if (obj && typeof obj === 'object') {
    const decoded: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        decoded[key] = decodeHtmlEntitiesInObject(obj[key])
      }
    }
    return decoded
  }
  
  return obj
}

const LANDING_PAGE_SLUGS: Record<string, string> = {
  'mittelstand': 'Mittelstand',
  'immobilien-bau': 'Immobilien & Bau',
  'corporate-high-end': 'Corporate High-End',
  'agentur-partner': 'Agentur & Partner',
  'ideen-check': '24h Ideen-Check',
}

async function getOrCreatePage(slug: string) {
  const { data: page, error: pageError } = await supabaseAdmin
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!pageError && page) return page

  if (!LANDING_PAGE_SLUGS[slug]) return null

  const { data: newPage, error: createError } = await supabaseAdmin
    .from('pages')
    .insert({
      slug,
      title: LANDING_PAGE_SLUGS[slug] || slug,
      description: `Landing Page: ${LANDING_PAGE_SLUGS[slug] || slug}`,
      is_active: true,
    })
    .select('id')
    .single()

  if (createError || !newPage) return null
  return newPage
}

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Handle both sync and async params (Next.js 15 compatibility)
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug

    const page = await getOrCreatePage(slug)
    if (!page) {
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
      const content = data?.[0]?.content || null
      const decodedContent = content ? decodeHtmlEntitiesInObject(content) : null
      return NextResponse.json(decodedContent)
    }

    // Convert to object and decode HTML entities
    const sectionsObj: Record<string, any> = {}
    data?.forEach((section) => {
      sectionsObj[section.section_key] = decodeHtmlEntitiesInObject(section.content)
    })

    return NextResponse.json(sectionsObj)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

