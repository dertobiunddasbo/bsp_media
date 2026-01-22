import { notFound } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { processTinyMCEHtml } from '@/lib/html-utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  
  const caseData = await getCase(slug)

  if (!caseData) {
    notFound()
  }

  const images = caseData.case_images || []
  const videos = caseData.case_videos || []
  
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

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <h2 className="text-3xl font-semibold text-dark mb-8">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: any) => {
                // Extract Vimeo video ID
                const getVimeoId = (url: string) => {
                  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
                  return match ? match[1] : url.split('/').pop()
                }
                
                // Extract YouTube video ID
                const getYouTubeId = (url: string) => {
                  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
                  return match ? match[1] : null
                }
                
                return (
                  <div key={video.id} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden vimeo-container">
                    {video.video_type === 'vimeo' ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${getVimeoId(video.video_url)}?title=0&byline=0&portrait=0&badge=0&autopause=1&transparent=1&controls=0`}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title || caseData.title}
                      />
                    ) : video.video_type === 'youtube' ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(video.video_url) || video.video_url.split('v=')[1]?.split('&')[0]}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title || caseData.title}
                      />
                    ) : (
                      <video
                        src={video.video_url}
                        controls
                        className="w-full h-full object-cover"
                        title={video.title || caseData.title}
                      />
                    )}
                    {video.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                        <p className="font-semibold">{video.title}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Images Section */}
      {images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <h2 className="text-3xl font-semibold text-dark mb-8">Bilder</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image: any) => (
                <div key={image.id} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <img
                    src={image.image_url}
                    alt={caseData.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

