/**
 * Page Content Helper
 * Centralized functions for loading page content from CMS
 */

import { getSectionContent } from './api'

export interface PageSections {
  hero?: any
  leistungen?: any
  about?: any
  trust?: any
  values?: any
  principles?: any
  nda?: any
  footer?: any
  [key: string]: any
}

export async function getPageSections(pageSlug: string): Promise<PageSections> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    // Try new pages system first
    const res = await fetch(`${baseUrl}/api/pages/${pageSlug}/sections`, {
      cache: 'no-store',
    })
    
    if (res.ok) {
      const data = await res.json()
      return data || {}
    }
    
    // Fallback: load sections individually
    const sections: PageSections = {}
    const sectionKeys = ['hero', 'leistungen', 'about', 'trust', 'values', 'principles', 'nda', 'footer']
    
    for (const key of sectionKeys) {
      const content = await getSectionContent(key as any, pageSlug)
      if (content) {
        sections[key] = content
      }
    }
    
    return sections
  } catch (error) {
    console.error(`Error loading page sections for ${pageSlug}:`, error)
    return {}
  }
}
