/**
 * Value Proposition Section Component
 * Displays company values with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { ValuePropositionData } from '@/lib/types'
import { getSectionContent, saveSectionContent, defaultValuePropositionData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import ValuePropositionEditor from '@/components/admin/editors/ValuePropositionEditor'
import { decodeHtmlEntities } from '@/lib/html-utils'

interface ValuePropositionProps {
  pageSlug?: string
}

export default function ValueProposition({ pageSlug = 'home' }: ValuePropositionProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<ValuePropositionData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('values', pageSlug)
    setData(content || defaultValuePropositionData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: ValuePropositionData) => {
    try {
      const result = await saveSectionContent('values', newData, pageSlug)
      if (result.success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert(`Fehler beim Speichern: ${result.error || 'Unbekannter Fehler'}`)
        console.error('Save failed for values section:', result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      console.error('Error saving values:', errorMessage)
      alert(`Fehler beim Speichern: ${errorMessage}`)
    }
  }

  if (loading || !data) {
    return (
      <section className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-white">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const values = data.values || []

  // Icon mappings
  const getIcon = (iconName?: string, size: string = "w-12 h-12") => {
    switch (iconName) {
      case 'partners':
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'quality':
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'communication':
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
      case 'reliability':
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'security':
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
      default:
        return (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        )
    }
  }

  return (
    <>
      <EditableSection sectionKey="values">
        <section className="py-40 bg-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="mb-32">
              {data.title && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-12 tracking-tight leading-[1.05]">
                  {data.title}
                </h2>
              )}
            </div>

            <div className="space-y-24">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center group"
                >
                  {/* Icon + Title (Left) */}
                  <div className="lg:col-span-4 flex items-start gap-6">
                    <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {getIcon(value.icon, "w-10 h-10")}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight pt-1">
                      {value.title}
                    </h3>
                  </div>

                  {/* Description (Right) */}
                  <div className="lg:col-span-8">
                    <p 
                      className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light max-w-4xl"
                      dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(value.description) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'values' && (
        <EditModal title="Werte Section bearbeiten">
          <ValuePropositionEditor
            sectionKey="values"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}



