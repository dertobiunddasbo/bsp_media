/**
 * Hero Section Component
 * Displays hero section with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useEditMode } from '@/contexts/EditModeContext'
import { HeroData } from '@/lib/types'
import { getSectionContent, saveSectionContent, defaultHeroData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import HeroEditor from '@/components/admin/editors/HeroEditor'

interface HeroProps {
  pageSlug?: string
}

export default function Hero({ pageSlug = 'home' }: HeroProps) {
  const { isEditMode, editingSection, setEditingSection } = useEditMode()
  const [scrollY, setScrollY] = useState(0)
  const [data, setData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadData = async () => {
    setLoading(true)
    console.log('[Hero] Loading data for pageSlug:', pageSlug)
    const content = await getSectionContent('hero', pageSlug)
    console.log('[Hero] Loaded content:', content)
    console.log('[Hero] BackgroundImage in loaded content:', content?.backgroundImage)
    console.log('[Hero] BackgroundVideo in loaded content:', (content as any)?.backgroundVideo)
    setData(content || defaultHeroData)
    console.log('[Hero] Data set to state:', content || defaultHeroData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSectionSaved = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSectionSaved)
    return () => window.removeEventListener('editMode:sectionSaved', handleSectionSaved)
  }, [pageSlug])

  // Force video reload when backgroundVideo URL changes
  useEffect(() => {
    if ((data as any)?.backgroundVideo) {
      console.log('[Hero] BackgroundVideo URL detected:', (data as any).backgroundVideo)
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        const videoElement = document.querySelector('#hero-background-video') as HTMLVideoElement
        if (videoElement) {
          console.log('[Hero] Video element found, forcing reload...')
          // Force reload by calling load() and setting currentTime to 0
          videoElement.pause()
          videoElement.currentTime = 0
          videoElement.load()
          videoElement.play().catch(err => {
            console.error('[Hero] Error playing video:', err)
          })
          console.log('[Hero] ✅ Video element reloaded and play() called')
        } else {
          console.warn('[Hero] ⚠️ Video element not found in DOM - may not be rendered yet')
        }
      }, 200)
      
      return () => clearTimeout(timeoutId)
    } else {
      console.log('[Hero] No backgroundVideo in data')
    }
  }, [(data as any)?.backgroundVideo])

  const handleSave = async (newData: HeroData) => {
    try {
      console.log('[Hero] handleSave called with data:', newData)
      console.log('[Hero] BackgroundImage in newData:', newData.backgroundImage)
      const result = await saveSectionContent('hero', newData, pageSlug)
      console.log('[Hero] saveSectionContent result:', result)
      
      // Report save result
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: result
      }))
      
      if (result.success) {
        // Wait a bit to ensure database is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        // Reload data from server instead of using local state
        console.log('[Hero] Reloading data...')
        await loadData()
        console.log('[Hero] Data reloaded')
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert(`Fehler beim Speichern: ${result.error || 'Unbekannter Fehler'}`)
        console.error('[Hero] Save failed:', result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      console.error('[Hero] Error saving hero:', errorMessage)
      
      // Report error
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: false, error: errorMessage }
      }))
      
      alert(`Fehler beim Speichern: ${errorMessage}`)
    }
  }
  
  // Listen for global save event - only save if this section is currently being edited
  useEffect(() => {
    if (!isEditMode || editingSection !== 'hero') return
    
    const handleGlobalSave = async () => {
      if (data) {
        await handleSave(data)
      }
    }
    
    window.addEventListener('editMode:save', handleGlobalSave)
    return () => window.removeEventListener('editMode:save', handleGlobalSave)
  }, [editingSection, data, isEditMode])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading || !data) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="text-white text-center">Wird geladen...</div>
      </section>
    )
  }

  return (
    <>
      <EditableSection sectionKey="hero">
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
          {/* Background Video or Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Background Video (wenn vorhanden) */}
            {(data as any).backgroundVideo ? (
              <video
                id="hero-background-video"
                key={`hero-video-${(data as any).backgroundVideo}`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{
                  transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
                  zIndex: 0,
                }}
                onError={(e) => {
                  const video = e.currentTarget
                  console.error('❌ Video load error:', {
                    url: (data as any).backgroundVideo,
                    networkState: video.networkState,
                    readyState: video.readyState,
                    error: video.error ? {
                      code: video.error.code,
                      message: video.error.message
                    } : null
                  })
                  // Try to reload the video after a short delay
                  setTimeout(() => {
                    console.log('🔄 Attempting to reload video...')
                    video.load()
                  }, 1000)
                }}
                onLoadedData={() => {
                  console.log('✅ Video loaded successfully:', (data as any).backgroundVideo)
                }}
                onCanPlay={() => {
                  console.log('✅ Video can play:', (data as any).backgroundVideo)
                }}
                onLoadStart={() => {
                  console.log('🔄 Video loading started:', (data as any).backgroundVideo)
                }}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget as HTMLVideoElement
                  console.log('📊 Video metadata loaded:', {
                    duration: video.duration,
                    videoWidth: video.videoWidth,
                    videoHeight: video.videoHeight,
                    url: (data as any).backgroundVideo
                  })
                }}
                onPlaying={() => {
                  console.log('▶️ Video is playing:', (data as any).backgroundVideo)
                }}
              >
                <source 
                  src={(data as any).backgroundVideo} 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              /* Fallback: Background Image with Parallax */
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{
                  backgroundImage: `url(${data.backgroundImage || defaultHeroData.backgroundImage})`,
                  transform: `translateY(${scrollY * 0.5}px)`,
                }}
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content - Zentriert, großzügig */}
          <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-40">
            <div className="text-center text-white animate-slide-up">
              {data.badge && (
                <div className="inline-block mb-16 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                  {data.badge}
                </div>
              )}
              {data.title && (
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-16 leading-[1.05] tracking-tight px-4">
                  {data.title.includes('für die operative Realität') ? (
                    <>
                      <span className="block mb-2">High-End Kommunikation</span>
                      <span className="block opacity-90">für die operative Realität.</span>
                    </>
                  ) : (
                    data.title
                  )}
                </h1>
              )}
              {data.subtitle && (
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-20 leading-relaxed font-light max-w-3xl mx-auto px-4">
                  {data.subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {pageSlug !== 'home' ? (
                  <>
                    <Link
                      href="/termin"
                      className="group bg-accent text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      📅 Termin vereinbaren
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {data.buttonText || 'Mehr erfahren'}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group bg-accent text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {data.buttonText || 'Verfügbarkeit prüfen'}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'hero' && (
        <EditModal title="Hero Section bearbeiten">
          <HeroEditor
            sectionKey="hero"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}


