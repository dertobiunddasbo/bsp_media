import { notFound } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

async function getCase(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select(`
        *,
        case_images (*),
        case_videos (*)
      `)
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching case:', error)
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              {caseData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <h2 className="text-3xl font-semibold text-dark mb-8">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: any) => (
                <div key={video.id} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {video.video_type === 'vimeo' ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${video.video_url.split('/').pop()}`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : video.video_type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.video_url.split('v=')[1]?.split('&')[0]}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                      <p className="font-semibold">{video.title}</p>
                    </div>
                  )}
                </div>
              ))}
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

