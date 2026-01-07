import { supabaseAdmin } from './supabase-admin'

export async function getPageSection(pageSlug: string, sectionKey: string) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', pageSlug)
      .single()

    if (pageError || !page) {
      return null
    }

    // Get section
    const { data: section, error: sectionError } = await supabaseAdmin
      .from('page_sections')
      .select('content')
      .eq('page_id', page.id)
      .eq('section_key', sectionKey)
      .single()

    if (sectionError || !section) {
      return null
    }

    return section.content
  } catch (error) {
    console.error('Error fetching page section:', error)
    return null
  }
}

export async function getPageSections(pageSlug: string) {
  try {
    // Get page by slug
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', pageSlug)
      .single()

    if (pageError || !page) {
      return {}
    }

    // Get all sections
    const { data: sections, error: sectionsError } = await supabaseAdmin
      .from('page_sections')
      .select('section_key, content, order_index')
      .eq('page_id', page.id)
      .order('order_index', { ascending: true })

    if (sectionsError || !sections) {
      return {}
    }

    // Convert to object
    const sectionsObj: Record<string, any> = {}
    sections.forEach((section) => {
      sectionsObj[section.section_key] = section.content
    })

    return sectionsObj
  } catch (error) {
    console.error('Error fetching page sections:', error)
    return {}
  }
}

