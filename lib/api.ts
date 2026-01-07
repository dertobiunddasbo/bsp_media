/**
 * Unified API Client
 * Centralized API calls for content management
 */

import { HeroData, LeistungenData, AboutData, SectionKey } from './types'

const API_BASE = '/api'

// ============================================
// Content API
// ============================================

export async function getSectionContent(
  section: SectionKey,
  pageSlug: string = 'home'
): Promise<any> {
  try {
    const path = pageSlug === 'home' 
      ? `${API_BASE}/content/${section}`
      : `${API_BASE}/pages/${pageSlug}/sections?section_key=${section}`
    
    // Add cache-busting parameter to ensure fresh data
    const cacheBuster = `?t=${Date.now()}`
    const url = pageSlug === 'home' 
      ? `${path}${cacheBuster}`
      : `${path}&t=${Date.now()}`
    
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    
    if (!res.ok) {
      console.error(`Failed to load ${section}:`, res.status, res.statusText)
      return null
    }
    
    const data = await res.json()
    console.log(`Loaded ${section} data:`, data)
    return data
  } catch (error) {
    console.error(`Error loading ${section}:`, error)
    return null
  }
}

export async function saveSectionContent(
  section: SectionKey,
  data: any,
  pageSlug: string = 'home'
): Promise<boolean> {
  try {
    const path = pageSlug === 'home'
      ? `${API_BASE}/admin/content`
      : `${API_BASE}/admin/pages/${pageSlug}/sections`
    
    const body = pageSlug === 'home'
      ? { page_section: section, content: data }
      : { section_key: section, content: data }

    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return res.ok
  } catch (error) {
    console.error(`Error saving ${section}:`, error)
    return false
  }
}

// ============================================
// Default Data
// ============================================

export const defaultHeroData: HeroData = {
  badge: 'Filmproduktion Hamburg',
  title: 'High-End Kommunikation für die operative Realität.',
  subtitle: 'Wir bringen Ihre Strategie dorthin, wo keine E-Mails gelesen werden. Die Produktionspartner für Konzerne mit komplexen Strukturen. Schnell, diskret und broadcast-ready.',
  buttonText: 'Verfügbarkeit prüfen',
  backgroundImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
}

export const defaultLeistungenData: LeistungenData = {
  title: 'Unsere Leistungen',
  subtitle: 'Professionelle audiovisuelle Lösungen für Ihr Unternehmen',
  items: [
    {
      title: 'Industrial Documentary',
      description: 'Authentische Einblicke in Werk, Logistik und Change-Prozesse. Wir begleiten Transformation da, wo sie passiert – ohne den Betrieb zu stören.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Knowledge & Academy',
      description: 'Onboarding und Schulung im Netflix-Standard. Wir übersetzen trockenes Expertenwissen in Video-Masterclasses, die wirklich zu Ende geschaut werden.',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Motion & Explanation',
      description: 'Komplexe Prozesse, Compliance oder IT-Security einfach erklärt. Wir verwandeln trockene Konzern-Vorgaben in verständliche Motion Graphics. Skalierbar, CI-konform und ideal für E-Learnings oder weltweite Rollouts.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Corporate Newsroom',
      description: 'Der wöchentliche CEO-Cast oder das Schicht-Update. Wir produzieren TV-Formate mit 24h-Turnaround. Damit Ihre Belegschaft informiert ist, bevor der Flurfunk startet.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Recruiting',
      description: 'Wir sorgen für mehr Bewerbungen. Authentische Einblicke in Ihre Unternehmenskultur, die die richtigen Kandidaten ansprechen. Ehrlich, direkt und ohne Marketing-Fassade.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ],
}

export const defaultAboutData: AboutData = {
  title: 'Dokumentarische DNA für Corporate Challenges.',
  text1: 'Hinter <span class="font-light text-slate-900">bsp media</span> steckt ein Team aus Filmemachern mit Wurzeln im Dokumentarfilm und Extremsport. Deshalb kommen wir klar, wo andere Agenturen umdrehen: In Hochsicherheitsbereichen, an Produktionsbändern oder in komplexen Betriebsstrukturen. Wir inszenieren nicht – wir finden die Story dort, wo sie entsteht.',
  text2: '',
  text3: '',
}

