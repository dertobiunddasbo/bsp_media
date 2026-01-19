/**
 * Leistungen Section Component
 * Displays services section with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { LeistungenData } from '@/lib/types'
import { getSectionContent, saveSectionContent, defaultLeistungenData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import LeistungenEditor from '@/components/admin/editors/LeistungenEditor'

interface LeistungenProps {
  pageSlug?: string
}

export default function Leistungen({ pageSlug = 'home' }: LeistungenProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<LeistungenData | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set())

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('leistungen', pageSlug)
    setData(content || defaultLeistungenData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: LeistungenData) => {
    try {
      const result = await saveSectionContent('leistungen', newData, pageSlug)
      if (result.success) {
        // Wait a bit to ensure database is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        // Reload data from server instead of using local state
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert(`Fehler beim Speichern: ${result.error || 'Unbekannter Fehler'}`)
        console.error('Save failed for leistungen section:', result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      console.error('Error saving leistungen:', errorMessage)
      alert(`Fehler beim Speichern: ${errorMessage}`)
    }
  }

  if (loading || !data) {
    return (
      <section id="leistungen" className="py-32 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const services = data.items || []

  return (
    <>
      <EditableSection sectionKey="leistungen">
        <section id="leistungen" className="py-40 bg-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-32">
              <div className="inline-block mb-8 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
                Was wir bieten
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-12 tracking-tight leading-[1.05]">
                {data.title || 'Unsere Leistungen'}
              </h2>
              {data.subtitle && (
                <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-light leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    {service.backgroundVideo && !videoErrors.has(index) ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => {
                          console.warn(`Video failed to load for service ${index}:`, service.backgroundVideo)
                          setVideoErrors(prev => new Set(prev).add(index))
                        }}
                        onLoadedData={() => {
                          setVideoErrors(prev => {
                            const newSet = new Set(prev)
                            newSet.delete(index)
                            return newSet
                          })
                        }}
                      >
                        <source src={service.backgroundVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'leistungen' && (
        <EditModal title="Leistungen Section bearbeiten">
          <LeistungenEditor
            sectionKey="leistungen"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}


