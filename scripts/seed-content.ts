/**
 * Seed script to populate page_content table with default content
 * Run with: npx tsx scripts/seed-content.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const defaultContent = {
  hero: {
    badge: 'Filmproduktion Hamburg',
    title: 'High-End Kommunikation für die operative Realität.',
    subtitle: 'Wir bringen Ihre Strategie dorthin, wo keine E-Mails gelesen werden. Die Produktionspartner für Konzerne mit komplexen Strukturen. Schnell, diskret und broadcast-ready.',
    buttonText: 'Verfügbarkeit prüfen',
    backgroundImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  },
  trust: {
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
  },
  nda: {
    badge: 'Vertrauen & Sicherheit',
    title: 'Ein geschützter Raum<br /><span className="text-accent">für Ihre Themen</span>',
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
        description: 'Langjährige Partnerschaften mit Unternehmen aus Industrie, Luftfahrt und Öffentlichkeit zeigen: Sie können sich auf unsere Zuverlässigkeit und Vertraulichkeit verlassen. <span className="font-semibold text-white">Unsere Teams sind geschult im Umgang mit Prototypen, Sperrfristen und Sicherheitsbereichen.</span>',
      },
    ],
    ctaText: 'Sprechen Sie uns an',
    ctaLink: '/kontakt',
  },
  values: {
    title: 'Unsere Werte',
    values: [
      {
        title: 'Partner auf Augenhöhe',
        description: 'Wir verstehen nicht nur Briefings, sondern Ihre Situation. Ob Vorstand oder Fachabteilung – wir sprechen Ihre Sprache und denken für Sie mit.',
        gradient: 'from-accent to-pink-600',
      },
      {
        title: 'Qualität, die überzeugt',
        description: 'Kein "Schema F", sondern maßgeschneiderte Lösungen. Wir sorgen dafür, dass Ihre Botschaft nicht nur gesendet, sondern auch gefühlt und verstanden wird.',
        gradient: 'from-accent to-pink-600',
      },
      {
        title: 'Verlässlichkeit als Prinzip',
        description: 'Wir wissen, dass Budgets und Deadlines heilig sind. Bei uns bekommen Sie kreativen Freiraum in einem sicheren Rahmen.',
        gradient: 'from-accent to-pink-600',
      },
    ],
  },
  principles: {
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
  },
  leistungen: {
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
  },
  about: {
    title: 'Dokumentarische DNA für Corporate Challenges.',
    text1: 'Hinter <span class="font-light text-slate-900">bsp media</span> steckt ein Team aus Filmemachern mit Wurzeln im Dokumentarfilm und Extremsport. Deshalb kommen wir klar, wo andere Agenturen umdrehen: In Hochsicherheitsbereichen, an Produktionsbändern oder in komplexen Betriebsstrukturen. Wir inszenieren nicht – wir finden die Story dort, wo sie entsteht.',
    text2: '',
    text3: '',
  },
  footer: {
    address: 'bsp media GmbH\nSillemstraße 76a\n20257 Hamburg',
    email: 'hallo@bsp-media.de',
    copyright: '© 2025 bsp media GmbH. Alle Rechte vorbehalten.',
  },
}

async function seedContent() {
  console.log('🌱 Seeding page_content table...\n')

  for (const [section, content] of Object.entries(defaultContent)) {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .upsert(
          {
            page_section: section,
            content: content,
          },
          {
            onConflict: 'page_section',
          }
        )
        .select()

      if (error) {
        console.error(`❌ Error seeding ${section}:`, error)
      } else {
        console.log(`✅ Seeded ${section} section`)
      }
    } catch (error) {
      console.error(`❌ Error seeding ${section}:`, error)
    }
  }

  console.log('\n✨ Seeding complete!')
  console.log('\nYou can now view the content at:')
  console.log('  - http://localhost:3000')
  console.log('  - http://localhost:3000?edit=true (to edit visually)')
}

seedContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

