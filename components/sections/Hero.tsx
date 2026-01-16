/**
 * Hero Section Component
 * Displays hero section with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
          {/* Background Video or Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Background Video (wenn vorhanden) */}
            {(data as any).backgroundVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{
                  transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
                }}
              >
                <source src={(data as any).backgroundVideo} type="video/mp4" />
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
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Content - Zentriert, großzügig */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-40">
            <div className="text-center text-white animate-slide-up max-w-5xl mx-auto">
              {data.badge && (
                <div className="inline-block mb-16 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                  {data.badge}
                </div>
              )}
              {data.title && (
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-16 leading-[1.05] tracking-tight">
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
                <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 mb-20 leading-relaxed font-light max-w-4xl mx-auto">
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

