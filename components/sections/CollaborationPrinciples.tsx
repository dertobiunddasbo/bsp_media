/**
 * Collaboration Principles Section Component
 * Displays collaboration principles with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { CollaborationPrinciplesData } from '@/lib/types'
import { getSectionContent, defaultCollaborationPrinciplesData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import CollaborationPrinciplesEditor from '@/components/admin/editors/CollaborationPrinciplesEditor'

interface CollaborationPrinciplesProps {
  pageSlug?: string
}

export default function CollaborationPrinciples({ pageSlug = 'home' }: CollaborationPrinciplesProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<CollaborationPrinciplesData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('principles', pageSlug)
    setData(content || defaultCollaborationPrinciplesData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: CollaborationPrinciplesData) => {
    try {
      const success = await saveSection('principles', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for principles section')
      }
    } catch (error) {
      console.error('Error saving principles:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

  if (loading || !data) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const principles = data.principles || []

  return (
    <>
      <EditableSection sectionKey="principles">
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              {data.title && (
                <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-12 tracking-tight">
                  {data.title}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-50 rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className={`relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${principle.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">
                    {principle.title}
                  </h3>
                  <p className="text-slate-800 leading-relaxed text-base font-light">
                    {principle.description}
                  </p>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${principle.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'principles' && (
        <EditModal title="Prinzipien Section bearbeiten">
          <CollaborationPrinciplesEditor
            sectionKey="principles"
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


