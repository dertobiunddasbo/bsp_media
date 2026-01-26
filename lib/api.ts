/**
 * Unified API Client
 * Centralized API calls for content management
 */

import { HeroData, LeistungenData, AboutData, TrustSectionData, ValuePropositionData, CollaborationPrinciplesData, NDADisclaimerData, FooterData, TestimonialData, FAQData, WhyUsData, SectionKey } from './types'

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
      // Try to get error details
      let errorDetails = null
      try {
        errorDetails = await res.json()
      } catch {
        // If response is not JSON, just use status
      }
      
      // Log error details in development
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to load ${section}:`, {
          status: res.status,
          statusText: res.statusText,
          details: errorDetails
        })
      } else {
        console.error(`Failed to load ${section}:`, res.status, res.statusText)
      }
      
      // Return null for 404/500 errors - let components use defaults
      return null
    }
    
    const data = await res.json()
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Loaded ${section} data:`, data)
    }
    
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Error loading ${section}:`, errorMessage)
    return null
  }
}

export async function saveSectionContent(
  section: SectionKey,
  data: any,
  pageSlug: string = 'home'
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`[saveSectionContent] Saving ${section} for page ${pageSlug}`)
    console.log(`[saveSectionContent] Data:`, data)
    
    // Input validation
    if (!section || typeof section !== 'string') {
      console.error(`[saveSectionContent] Invalid section key:`, section)
      return { success: false, error: 'Invalid section key' }
    }
    
    if (!data || typeof data !== 'object') {
      console.error(`[saveSectionContent] Invalid content data:`, data)
      return { success: false, error: 'Invalid content data' }
    }

    const path = pageSlug === 'home'
      ? `${API_BASE}/admin/content`
      : `${API_BASE}/admin/pages/${pageSlug}/sections`
    
    const body = pageSlug === 'home'
      ? { page_section: section, content: data }
      : { section_key: section, content: data }

    console.log(`[saveSectionContent] POST to:`, path)
    console.log(`[saveSectionContent] Body:`, body)

    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    console.log(`[saveSectionContent] Response status:`, res.status)
    console.log(`[saveSectionContent] Response ok:`, res.ok)

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
      console.error(`[saveSectionContent] Error response:`, errorData)
      return { success: false, error: errorData.error || `HTTP ${res.status}` }
    }

    const responseData = await res.json().catch(() => null)
    console.log(`[saveSectionContent] Success response:`, responseData)
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[saveSectionContent] Error saving ${section}:`, errorMessage)
    return { success: false, error: errorMessage }
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
      title: 'Employer Branding & Recruiting',
      description: 'Wir sorgen für mehr Bewerbungen. Authentische Einblicke in Ihre Unternehmenskultur, die die richtigen Kandidaten ansprechen. Ehrlich, direkt und ohne Marketing-Fassade.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Livestreams & Townhalls',
      description: 'Professionelle Live-Übertragungen für interne Kommunikation, Townhalls und Events. Broadcast-Qualität für Ihre digitale Präsenz.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Strategy & Consulting',
      description: 'Strategische Beratung für Ihre audiovisuelle Kommunikation. Von der Konzeption bis zur Umsetzung – wir begleiten Sie durch den gesamten Prozess.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ],
}

export const defaultAboutData: AboutData = {
  title: 'Dokumentarische DNA für Corporate Challenges.',
  text1: 'Hinter <span class="font-light text-slate-900">bsp media</span> steckt ein Team aus Filmemachern mit Wurzeln im Dokumentarfilm und Extremsport. Deshalb kommen wir klar, wo andere Agenturen umdrehen: In Hochsicherheitsbereichen, an Produktionsbändern oder in komplexen Betriebsstrukturen. Wir inszenieren nicht – wir finden die Story dort, wo sie entsteht.',
  text2: '',
  text3: '',
  image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
}

export const defaultTrustSectionData: TrustSectionData = {
  title: 'Vertrauen durch Erfahrung in Industrie, Luftfahrt und Öffentlichkeit.',
  subtitle: 'Erfahren in der Zusammenarbeit mit Betriebsräten, Vorständen und Sicherheitsabteilungen in Hochsicherheitsbereichen.',
  clients: [
    { name: 'VW Nutzfahrzeuge', logo: '/assets/VWN_Logo_grau.png' },
    { name: 'ALDI SÜD', logo: '/assets/ALDISÜD_Logo_grau.png' },
    { name: 'Vodafone', logo: '/assets/Vodafone_Logo_grau.png' },
    { name: 'Flughafen Hamburg', logo: '/assets/Airport_Logo_grau.png' },
    { name: 'ZAL Zentrum für Angewandte Luftfahrtforschung', logo: '/assets/ZAL_Logo_grau.png' },
    { name: 'Paypal', logo: '/assets/Paypal_Logo_grau.png' },
    { name: 'Ford', logo: '/assets/Ford_Logo_grau.png' },
    { name: 'BVG', logo: '/assets/BVG_Logo_grau.png' },
    { name: 'apoprojekt', logo: '/assets/apoprojekt_Logo_grau.png' },
    { name: 'Children for a better World e.V.', logo: '/assets/Children_Logo_grau.png' },
  ],
}

export const defaultValuePropositionData: ValuePropositionData = {
  title: 'Unsere Werte',
  values: [
    {
      title: 'Partner auf Augenhöhe',
      description: 'Wir verstehen nicht nur Briefings, sondern Ihre Situation. Transparenz und gegenseitiges Vertrauen bilden die Basis für erfolgreiche Projekte. Wir entwickeln gemeinsam Lösungen statt nur zu liefern.',
      gradient: 'from-accent to-pink-600',
      icon: 'partners',
    },
    {
      title: 'Qualität, die überzeugt',
      description: 'Kein "Schema F", sondern maßgeschneiderte Lösungen. Wir sorgen dafür, dass Ihre Botschaft nicht nur gesendet, sondern auch gefühlt und verstanden wird.',
      gradient: 'from-accent to-pink-600',
      icon: 'quality',
    },
    {
      title: 'Proaktive Kommunikation',
      description: 'Wir informieren Sie frühzeitig über Herausforderungen und bringen konstruktive Lösungsvorschläge ein. Klare Strukturen und konkrete Ansprechpartner sorgen für effiziente Prozesse.',
      gradient: 'from-accent to-pink-600',
      icon: 'communication',
    },
    {
      title: 'Verlässlichkeit als Prinzip',
      description: 'Wir wissen, dass Budgets und Deadlines heilig sind. Bei uns bekommen Sie kreativen Freiraum in einem sicheren Rahmen.',
      gradient: 'from-accent to-pink-600',
      icon: 'reliability',
    },
    {
      title: 'Diskretion & Sicherheit',
      description: 'Viele unserer Projekte behandeln sensible interne Themen. Diskretion ist Teil unseres Qualitätsversprechens. Wir sind geschult im Umgang mit Prototypen, Sperrfristen und Sicherheitsbereichen.',
      gradient: 'from-accent to-pink-600',
      icon: 'security',
    },
  ],
}

export const defaultCollaborationPrinciplesData: CollaborationPrinciplesData = {
  title: 'Das ist uns wichtig:',
  principles: [
    {
      title: 'Offener und partnerschaftlicher Austausch auf Augenhöhe',
      description: 'Wir brauchen keine reinen Dienstleister*innen, sondern Partner*innen, die mit uns gemeinsam Lösungen entwickeln. Transparenz und gegenseitiges Vertrauen bilden die Basis für erfolgreiche Projekte.',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Proaktive Kommunikation und Beratung',
      description: 'Hinsichtlich der Konzeption, Umsetzung und Optimierung: Es ist besser, proaktiv informiert zu werden, statt immer nachfragen zu müssen. Wir schätzen Partner*innen, die uns frühzeitig auf Herausforderungen hinweisen und konstruktive Lösungsvorschläge einbringen.',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Effiziente Prozesse und konkrete Ansprechpartner:innen',
      description: 'In der Kommunikation, Planung, Umsetzung und Optimierung von Aufträgen brauchen wir klare Strukturen und einen konkreten Ansprechpartner je Auftrag. Niemandem nutzen große E-Mail-Verteiler oder eine E-Mail- oder gar Terminflut.',
      gradient: 'from-accent to-pink-600',
    },
  ],
}

export const defaultNDADisclaimerData: NDADisclaimerData = {
  badge: 'Vertrauen & Sicherheit',
  title: 'Ein geschützter Raum<br /><span class="text-accent">für Ihre Themen</span>',
  subtitle: '',
  items: [
    {
      title: 'Diskretion',
      description: 'Viele unserer Projekte behandeln sensible interne Themen. Wir bitten um Verständnis, dass wir diese Arbeiten nicht öffentlich zeigen. Diskretion ist Teil unseres Qualitätsversprechens.',
    },
    {
      title: 'DSGVO-konform',
      description: 'Wir behandeln alle Daten und Inhalte nach höchsten Datenschutzstandards. Unsere Prozesse sind DSGVO-konform und wir arbeiten mit klaren Vereinbarungen zur Datenverarbeitung.',
    },
    {
      title: 'Vertrauen',
      description: 'Langjährige Partnerschaften mit Unternehmen aus Industrie, Luftfahrt und Öffentlichkeit zeigen: Sie können sich auf unsere Zuverlässigkeit und Vertraulichkeit verlassen. Unsere Teams sind geschult im Umgang mit Prototypen, Sperrfristen und Sicherheitsbereichen.',
    },
  ],
  ctaText: 'Sprechen Sie uns an',
  ctaLink: '/kontakt',
}

export const defaultFooterData: FooterData = {
  address: 'bsp media GmbH\n              Sillemstraße 76a\n              20257 Hamburg',
  email: 'hallo@bsp-media.de',
  copyright: '© 2025 bsp media GmbH. Alle Rechte vorbehalten.',
}

export const defaultTestimonialData: TestimonialData = {
  title: 'Was unsere Kunden sagen',
  subtitle: 'Erfolgreiche Projekte, zufriedene Partner',
  testimonials: [
    {
      name: 'Max Mustermann',
      position: 'Head of Communications',
      company: 'ALDI SÜD',
      quote: 'BSP Media hat unsere Supplier Portraits mit einer außergewöhnlichen Sensibilität umgesetzt. Die Filme zeigen nicht nur Produkte, sondern die Menschen dahinter – genau das, was wir uns vorgestellt haben.',
      rating: 5,
    },
    {
      name: 'Sarah Schmidt',
      position: 'HR Director',
      company: 'apoprojekt',
      quote: 'Die Recruiting-Videos haben unsere Bewerberzahlen deutlich erhöht. Authentisch, ehrlich und genau richtig für unsere Zielgruppe. Die Zusammenarbeit war professionell und unkompliziert.',
      rating: 5,
    },
    {
      name: 'Dr. Thomas Weber',
      position: 'Projektleiter',
      company: 'ZAL Zentrum für Angewandte Luftfahrtforschung',
      quote: 'Komplexe technische Inhalte verständlich zu machen – das ist die Stärke von BSP Media. Die Eventdokumentation der Innovation Days war genau das, was wir brauchten: dynamisch, informativ und visuell überzeugend.',
      rating: 5,
    },
  ],
}

export const defaultFAQData: FAQData = {
  title: 'Häufig gestellte Fragen',
  subtitle: 'Alles, was Sie über unsere Filmproduktion wissen müssen',
  items: [
    {
      question: 'Wie lange dauert ein Projekt?',
      answer: 'Die Dauer variiert je nach Projektumfang. Ein einfaches Recruiting-Video kann in 2-3 Wochen umgesetzt werden, während komplexe Dokumentationen oder mehrere Videos 4-8 Wochen in Anspruch nehmen. Nach dem Briefing erhalten Sie einen detaillierten Zeitplan.',
    },
    {
      question: 'Was kostet ein Video?',
      answer: 'Unsere Preise richten sich nach Umfang, Komplexität und Anforderungen. Wir arbeiten mit transparenten Festpreisen. Für ein erstes Angebot kontaktieren Sie uns bitte – wir erstellen innerhalb von 24 Stunden ein detailliertes, unverbindliches Angebot.',
    },
    {
      question: 'Arbeiten Sie deutschlandweit?',
      answer: 'Ja, wir produzieren bundesweit und international. Unser Team ist mobil und kommt zu Ihnen. Ob Hamburg, München, Berlin oder internationale Standorte – wir sind flexibel.',
    },
    {
      question: 'Was passiert nach der Anfrage?',
      answer: 'Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden bei Ihnen. Wir besprechen Ihr Projekt, Ihre Ziele und Anforderungen. Anschließend erhalten Sie ein detailliertes Angebot mit Zeitplan und Festpreis. Nach Auftragserteilung starten wir mit dem Briefing.',
    },
    {
      question: 'Können Sie auch kurzfristig produzieren?',
      answer: 'Ja, wir können auch kurzfristige Projekte umsetzen. Für dringende Anfragen haben wir flexible Kapazitäten. Bitte kontaktieren Sie uns direkt, um die Verfügbarkeit zu prüfen.',
    },
    {
      question: 'Welche Formate liefern Sie?',
      answer: 'Wir liefern in allen gängigen Formaten: 4K, Full HD, optimiert für Web, Social Media, TV oder interne Kommunikation. Die Formate werden individuell auf Ihre Verwendungszwecke angepasst.',
    },
    {
      question: 'Wie viele Korrekturschleifen sind inklusive?',
      answer: 'In der Regel sind 2-3 Korrekturschleifen im Festpreis enthalten. Wir arbeiten iterativ und transparent – Sie sehen Zwischenstände und können Feedback geben, bis das Ergebnis perfekt ist.',
    },
    {
      question: 'Arbeiten Sie mit NDAs?',
      answer: 'Ja, selbstverständlich. Viele unserer Projekte behandeln sensible interne Themen. Diskretion und Vertraulichkeit sind für uns selbstverständlich. Wir arbeiten mit NDAs und DSGVO-konformen Prozessen.',
    },
  ],
}

export const defaultWhyUsData: WhyUsData = {
  title: 'Warum BSP Media?',
  subtitle: 'Was uns ausmacht',
  items: [
    {
      number: '01',
      title: 'Wir leben die Stories, die wir erzählen',
      description: 'Hinter bsp media steckt ein Team aus Filmemachern mit Wurzeln im Dokumentarfilm und Extremsport. Deshalb kommen wir klar, wo andere Agenturen umdrehen: In Hochsicherheitsbereichen, an Produktionsbändern oder in komplexen Betriebsstrukturen. Wir inszenieren nicht – wir finden die Story dort, wo sie entsteht.',
      linkText: 'Portfolio',
      linkUrl: '/portfolio',
    },
    {
      number: '02',
      title: 'Schwierige Locations? Kein Problem.',
      description: 'Wir sind daran gewöhnt, in herausfordernden oder schwer zugänglichen Umgebungen zu arbeiten. Unsere Ausrüstung ist für den Einsatz unter rauen Bedingungen optimiert, ob in Hochsicherheitsbereichen, an laufenden Produktionsbändern oder in komplexen Betriebsstrukturen. Wir lieben diese Herausforderungen und übersetzen unsere Leidenschaft für authentische Dokumentation in unsere Arbeit.',
      linkText: 'Aktuelle Projekte',
      linkUrl: '/portfolio',
    },
    {
      number: '03',
      title: 'Ehrlichkeit statt Inszenierung',
      description: 'Wir sind ein kleines Team von Experten, gut vernetzt und schnell. Wir pflegen eine persönliche Beziehung zu unseren Kunden. Unsere Erfahrung lässt uns Ihre Probleme verstehen und schnell lösen. Wir haben in Agenturen gearbeitet, große Kunden betreut und wissen, was es braucht, um eine Marke aufzubauen.',
      linkText: 'Über uns',
      linkUrl: '/',
    },
  ],
}
