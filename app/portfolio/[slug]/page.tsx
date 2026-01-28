import { notFound } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CaseMedia from '@/components/CaseMedia'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { processTinyMCEHtml } from '@/lib/html-utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAllCases() {
  try {
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select('id, slug, title')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching all cases:', error)
    return []
  }
}

async function getCase(slug: string) {
  try {
    console.log(`[getCase] Fetching case with slug/id: ${slug}`)
    
    // Try to find by slug first, then by id
    let query = supabaseAdmin
      .from('cases')
      .select(`
        *,
        case_images (*),
        case_videos (*)
      `)
      .eq('slug', slug)
    
    let { data, error } = await query.single()
    
    console.log(`[getCase] Query by slug result:`, { found: !!data, error: error?.message })

    // If not found by slug, try by id
    if (error || !data) {
      console.log(`[getCase] Trying to find by id: ${slug}`)
      const { data: dataById, error: errorById } = await supabaseAdmin
        .from('cases')
        .select(`
          *,
          case_images (*),
          case_videos (*)
        `)
        .eq('id', slug)
        .single()
      
      if (errorById || !dataById) {
        console.log(`[getCase] Not found by id either:`, errorById?.message)
        return null
      }
      
      console.log(`[getCase] Found by id:`, { 
        title: dataById.title, 
        images: dataById.case_images?.length || 0, 
        videos: dataById.case_videos?.length || 0 
      })
      
      // Sort images and videos by order_index, then by created_at
      if (dataById.case_images) {
        dataById.case_images.sort((a: any, b: any) => {
          const orderDiff = (a.order_index || 0) - (b.order_index || 0)
          if (orderDiff !== 0) return orderDiff
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
        })
      }
      if (dataById.case_videos) {
        dataById.case_videos.sort((a: any, b: any) => {
          const orderDiff = (a.order_index || 0) - (b.order_index || 0)
          if (orderDiff !== 0) return orderDiff
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
        })
      }
      
      return dataById
    }

    // Sort images and videos by order_index, then by created_at
    if (data.case_images) {
      data.case_images.sort((a: any, b: any) => {
        const orderDiff = (a.order_index || 0) - (b.order_index || 0)
        if (orderDiff !== 0) return orderDiff
        return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      })
    }
    if (data.case_videos) {
      data.case_videos.sort((a: any, b: any) => {
        const orderDiff = (a.order_index || 0) - (b.order_index || 0)
        if (orderDiff !== 0) return orderDiff
        return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      })
    }

    console.log(`[getCase] Found by slug:`, { 
      title: data.title, 
      images: data.case_images?.length || 0, 
      videos: data.case_videos?.length || 0 
    })
    
    return data
  } catch (error) {
    console.error('[getCase] Error fetching case:', error)
    return null
  }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const slug = resolvedParams.slug
  
  const [caseData, allCases] = await Promise.all([getCase(slug), getAllCases()])

  if (!caseData) {
    notFound()
  }

  const images = caseData.case_images || []
  const videos = caseData.case_videos || []

  // Find current case index and navigation
  const currentIndex = allCases.findIndex(
    (c) => c.id === caseData.id || c.slug === caseData.slug
  )
  const prevCase = currentIndex > 0 ? allCases[currentIndex - 1] : null
  const nextCase = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null
  
  console.log(`[CasePage] Rendering case:`, {
    title: caseData.title,
    imagesCount: images.length,
    videosCount: videos.length,
    hasDescription: !!caseData.description
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseData.image_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'}
            alt={caseData.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 h-full flex items-end pb-16">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
              {caseData.category}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {caseData.title}
            </h1>
            {caseData.client && (
              <p className="text-xl text-gray-300 font-light">
                {caseData.client}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {caseData.description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
            <div 
              className="prose prose-lg max-w-none text-xl text-gray-700 leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: processTinyMCEHtml(caseData.description, true) }}
            />
          </div>
        </section>
      )}

      <CaseMedia videos={videos} images={images} caseTitle={caseData.title} />

      {/* Navigation */}
      <section className="py-16 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {prevCase ? (
                <a
                  href={`/portfolio/${prevCase.slug || prevCase.id}`}
                  className="group flex items-center gap-4 text-dark hover:text-accent transition-colors"
                >
                  <svg
                    className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500 font-light mb-1">Vorheriges Projekt</div>
                    <div className="text-lg font-semibold">{prevCase.title}</div>
                  </div>
                </a>
              ) : (
                <div></div>
              )}
            </div>

            <a
              href="/portfolio"
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors font-semibold"
            >
              Zurück zur Übersicht
            </a>

            <div className="flex-1 flex justify-end">
              {nextCase ? (
                <a
                  href={`/portfolio/${nextCase.slug || nextCase.id}`}
                  className="group flex items-center gap-4 text-dark hover:text-accent transition-colors text-right"
                >
                  <div>
                    <div className="text-sm text-gray-500 font-light mb-1">Nächstes Projekt</div>
                    <div className="text-lg font-semibold">{nextCase.title}</div>
                  </div>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

