/**
 * About Section Component
 * Displays about section with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { AboutData } from '@/lib/types'
import { getSectionContent, saveSectionContent, defaultAboutData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import AboutEditor from '@/components/admin/editors/AboutEditor'

interface AboutProps {
  pageSlug?: string
}

export default function About({ pageSlug = 'home' }: AboutProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('about', pageSlug)
    setData(content || defaultAboutData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: AboutData) => {
    try {
      console.log('[About] handleSave called with data:', newData)
      const result = await saveSectionContent('about', newData, pageSlug)
      console.log('[About] saveSectionContent result:', result)
      
      // Report save result
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: result
      }))
      
      if (result.success) {
        // Wait a bit to ensure database is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        // Reload data from server instead of using local state
        console.log('[About] Reloading data...')
        await loadData()
        console.log('[About] Data reloaded')
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert(`Fehler beim Speichern: ${result.error || 'Unbekannter Fehler'}`)
        console.error('[About] Save failed:', result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      console.error('[About] Error saving about:', errorMessage)
      
      // Report error
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: false, error: errorMessage }
      }))
      
      alert(`Fehler beim Speichern: ${errorMessage}`)
    }
  }

  if (loading || !data) {
    return (
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  return (
    <>
      <EditableSection sectionKey="about">
        <section id="about" className="py-32 bg-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block mb-8 px-5 py-2 bg-accent/10 rounded-full text-sm font-light text-accent border border-accent/20">
                  Über uns
                </div>
                {data.title && (
                  <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-12 leading-tight tracking-tight">
                    {data.title}
                  </h2>
                )}
                <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-extralight">
                  {data.text1 && (
                    <p dangerouslySetInnerHTML={{ __html: data.text1 }} />
                  )}
                  {data.text2 && (
                    <p dangerouslySetInnerHTML={{ __html: data.text2 }} />
                  )}
                  {data.text3 && (
                    <p dangerouslySetInnerHTML={{ __html: data.text3 }} />
                  )}
                </div>
                <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">10+</div>
                    <div className="text-sm text-gray-600 font-extralight">Jahre Erfahrung</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">500+</div>
                    <div className="text-sm text-gray-600 font-extralight">Projekte</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">100%</div>
                    <div className="text-sm text-gray-600 font-extralight">Deadline-Treue</div>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                    alt="Professionelle Filmproduktion Hamburg"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Hamburg</div>
                          <div className="text-sm text-gray-600 font-extralight">Filmproduktion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl blur-2xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/30 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'about' && (
        <EditModal title="About Section bearbeiten">
          <AboutEditor
            sectionKey="about"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}


