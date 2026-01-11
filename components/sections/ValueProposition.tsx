/**
 * Value Proposition Section Component
 * Displays company values with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { ValuePropositionData } from '@/lib/types'
import { getSectionContent, defaultValuePropositionData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import ValuePropositionEditor from '@/components/admin/editors/ValuePropositionEditor'

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
      const success = await saveSection('values', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for values section')
      }
    } catch (error) {
      console.error('Error saving values:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
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

  return (
    <>
      <EditableSection sectionKey="values">
        <section className="py-32 bg-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              {data.title && (
                <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
                  {data.title}
                </h2>
              )}
              <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className={`relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg font-light">
                    {value.description}
                  </p>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
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


