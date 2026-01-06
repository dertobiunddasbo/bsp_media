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
  console.log('  - http://localhost:3000/admin/content (to edit)')
}

seedContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

