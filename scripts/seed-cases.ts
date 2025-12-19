import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

interface CaseData {
  title: string
  description: string
  category: string
  slug: string
  client: string
  image_url: string
  videos: Array<{ video_url: string; video_type: string; title: string; order_index: number }>
  images: Array<{ image_url: string; order_index: number }>
}

const cases: CaseData[] = [
  {
    title: 'ALDI SÜD Supplier Portraits',
    description: 'Für ALDI SÜD haben wir eine Reihe von einfühlsamen 3–4-minütigen Portraitfilmen produziert, die die Menschen hinter den Produkten sichtbar machen. Ob Teppich Wülfing, Frosta, New Coffee oder die Molkerei Gruppe Gropper – jeder Film erzählt die individuelle Geschichte eines Lieferanten und zeigt, mit welcher Leidenschaft und Sorgfalt sie arbeiten.\n\nDurch authentische Einblicke in Produktion, Werte und tägliche Abläufe entstehen nahe, glaubwürdige Markenmomente. Die Portraits stärken die Transparenz entlang der Lieferkette und schaffen Vertrauen zwischen Marke und Kundschaft. Ein Corporate-Filmprojekt, das zeigt, wie viel echtes Engagement in jedem Produkt steckt.',
    category: 'Corporate',
    slug: 'aldi-sued-supplier-portraits',
    client: 'ALDI SÜD',
    image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        video_url: 'https://vimeo.com/placeholder-new-coffee',
        video_type: 'vimeo',
        title: 'New Coffee Portrait',
        order_index: 0
      },
      {
        video_url: 'https://vimeo.com/placeholder-molkerei-gropper',
        video_type: 'vimeo',
        title: 'Molkerei Gropper Portrait',
        order_index: 1
      },
      {
        video_url: 'https://vimeo.com/placeholder-frosta',
        video_type: 'vimeo',
        title: 'Frosta Portrait',
        order_index: 2
      }
    ],
    images: [
      {
        image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 0
      },
      {
        image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 1
      },
      {
        image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 2
      },
      {
        image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 3
      },
      {
        image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 4
      }
    ]
  },
  {
    title: 'apoprojekt & Du',
    description: 'Für das bundesweit tätige Bau- und Projektentwicklungsunternehmen apoprojekt haben wir eine Serie authentischer Mitarbeiterportraits produziert. An allen deutschen Standorten entstanden zweiminütige Filme, die Menschen, Rollen und Arbeitskultur unmittelbar erlebbar machen.\n\nDie Portraits wurden speziell für die HR-Abteilung konzipiert und unterstützen das Recruiting, indem sie echte Einblicke in den Arbeitsalltag, Teamgeist und die Vielfalt der Aufgaben geben. Zusätzlich haben wir passgenaue Social-Media-Cutdowns erstellt, um die Inhalte plattformgerecht und aufmerksamkeitsstark auszuspielen.',
    category: 'Employer Branding',
    slug: 'apoprojekt-employer-branding',
    client: 'apoprojekt',
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        video_url: 'https://vimeo.com/placeholder-mitarbeiterportrait',
        video_type: 'vimeo',
        title: 'Mitarbeiterportrait',
        order_index: 0
      },
      {
        video_url: 'https://vimeo.com/placeholder-social-media',
        video_type: 'vimeo',
        title: 'Social Media Cutdown',
        order_index: 1
      }
    ],
    images: [
      {
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 0
      },
      {
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 1
      },
      {
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 2
      },
      {
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 3
      },
      {
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 4
      }
    ]
  },
  {
    title: 'ZAL Innovation Days',
    description: 'Die ZAL – das Zentrum für Angewandte Luftfahrtforschung und Hamburgs Innovationshub für die Luftfahrt – veranstaltete die Innovation Days, die wir in einer dynamischen Eventdokumentation festgehalten haben. Mit zwei Kamerateams begleiteten wir den zweitägigen Kongress, hielten Panels, Workshops, Ausstellungen und Networking-Momente aus nächster Nähe fest und fingen die Innovationskraft der Veranstaltung ein.\n\nDurch schnelle Bildsprache, authentische O-Töne und starke visuelle Eindrücke entsteht ein kompakter Eventfilm, der die Vielfalt der Themen ebenso zeigt wie die Energie der Teilnehmenden. Das Ergebnis dient ZAL als wirkungsstarkes Kommunikationsmittel, um Reichweite zu erhöhen und die Bedeutung des Innovationsstandorts Hamburg sichtbar zu machen.',
    category: 'Event/Kongressfilm',
    slug: 'zal-innovation-days',
    client: 'ZAL',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        video_url: 'https://vimeo.com/placeholder-eventfilm',
        video_type: 'vimeo',
        title: 'Eventfilm',
        order_index: 0
      },
      {
        video_url: 'https://vimeo.com/placeholder-highlights',
        video_type: 'vimeo',
        title: 'Highlights',
        order_index: 1
      }
    ],
    images: [
      {
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 0
      },
      {
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 1
      },
      {
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 2
      },
      {
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 3
      },
      {
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        order_index: 4
      }
    ]
  }
]

async function seedCases() {
  console.log('🌱 Starting to seed cases...\n')

  for (const caseData of cases) {
    try {
      console.log(`📝 Creating case: ${caseData.title}`)

      // Check if case already exists
      const { data: existingCase } = await supabase
        .from('cases')
        .select('id')
        .eq('slug', caseData.slug)
        .single()

      let caseId: string

      if (existingCase) {
        console.log(`   ⚠️  Case with slug "${caseData.slug}" already exists, updating...`)
        const { data: updatedCase, error: updateError } = await supabase
          .from('cases')
          .update({
            title: caseData.title,
            description: caseData.description,
            category: caseData.category,
            client: caseData.client,
            image_url: caseData.image_url
          })
          .eq('slug', caseData.slug)
          .select()
          .single()

        if (updateError) throw updateError
        caseId = updatedCase.id
        console.log(`   ✅ Case updated`)
      } else {
        // Create case
        const { data: newCase, error: caseError } = await supabase
          .from('cases')
          .insert({
            title: caseData.title,
            description: caseData.description,
            category: caseData.category,
            slug: caseData.slug,
            client: caseData.client,
            image_url: caseData.image_url
          })
          .select()
          .single()

        if (caseError) throw caseError
        caseId = newCase.id
        console.log(`   ✅ Case created with ID: ${caseId}`)
      }

      // Delete existing images and videos for this case (to avoid duplicates)
      await supabase.from('case_images').delete().eq('case_id', caseId)
      await supabase.from('case_videos').delete().eq('case_id', caseId)

      // Insert images
      if (caseData.images.length > 0) {
        const { error: imagesError } = await supabase
          .from('case_images')
          .insert(
            caseData.images.map(img => ({
              case_id: caseId,
              image_url: img.image_url,
              order_index: img.order_index
            }))
          )

        if (imagesError) throw imagesError
        console.log(`   ✅ Inserted ${caseData.images.length} images`)
      }

      // Insert videos
      if (caseData.videos.length > 0) {
        const { error: videosError } = await supabase
          .from('case_videos')
          .insert(
            caseData.videos.map(video => ({
              case_id: caseId,
              video_url: video.video_url,
              video_type: video.video_type,
              title: video.title,
              order_index: video.order_index
            }))
          )

        if (videosError) throw videosError
        console.log(`   ✅ Inserted ${caseData.videos.length} videos`)
      }

      console.log(`   ✨ Case "${caseData.title}" completed\n`)
    } catch (error) {
      console.error(`   ❌ Error processing case "${caseData.title}":`, error)
      throw error
    }
  }

  console.log('🎉 All cases seeded successfully!')
}

seedCases()
  .then(() => {
    console.log('\n✅ Seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  })

