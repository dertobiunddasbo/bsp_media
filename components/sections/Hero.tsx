/**
 * Hero Section Component
 * Displays hero section with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { HeroData } from '@/lib/types'
import { getSectionContent, defaultHeroData } from '@/lib/api'
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
    const content = await getSectionContent('hero', pageSlug)
    setData(content || defaultHeroData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: HeroData) => {
    try {
      const success = await saveSection('hero', newData, pageSlug)
      if (success) {
        // Wait a bit to ensure database is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        // Reload data from server instead of using local state
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for hero section')
      }
    } catch (error) {
      console.error('Error saving hero:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

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
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage: `url(${data.backgroundImage || defaultHeroData.backgroundImage})`,
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <div className="text-white animate-slide-up">
                {data.badge && (
                  <div className="inline-block mb-8 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                    {data.badge}
                  </div>
                )}
                {data.title && (
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.05] tracking-tight">
                    {data.title}
                  </h1>
                )}
                {data.subtitle && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />
                    <p className="text-xl sm:text-2xl text-white mb-16 leading-relaxed font-light max-w-2xl p-6 relative z-10">
                      {data.subtitle}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {data.buttonText || 'Verfügbarkeit prüfen'}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right: Showreel Video */}
              <div className="hidden lg:block relative">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group scale-110">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/9pnVxYwdpfs?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0"
                    title="BSP Media Showreel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-lg blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-xl animate-pulse delay-300" />
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

// Helper function
async function saveSection(section: string, data: any, pageSlug: string): Promise<boolean> {
  try {
    const path = pageSlug === 'home'
      ? '/api/admin/content'
      : `/api/admin/pages/${pageSlug}/sections`
    
    const body = pageSlug === 'home'
      ? { page_section: section, content: data }
      : { section_key: section, content: data }

    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
      console.error(`API Error (${res.status}):`, errorData)
      return false
    }

    const result = await res.json()
    console.log(`Successfully saved ${section}:`, result)
    return true
  } catch (error) {
    console.error(`Error saving ${section}:`, error)
    return false
  }
}

