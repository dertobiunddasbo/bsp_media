/**
 * Trust Section Component
 * Displays client logos with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { TrustSectionData } from '@/lib/types'
import { getSectionContent, defaultTrustSectionData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import TrustSectionEditor from '@/components/admin/editors/TrustSectionEditor'

interface TrustSectionProps {
  pageSlug?: string
}

export default function TrustSection({ pageSlug = 'home' }: TrustSectionProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<TrustSectionData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('trust', pageSlug)
    setData(content || defaultTrustSectionData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: TrustSectionData) => {
    try {
      const success = await saveSection('trust', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for trust section')
      }
    } catch (error) {
      console.error('Error saving trust:', error)
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

  const clients = data.clients || []

  return (
    <>
      <EditableSection sectionKey="trust">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            {data.title && (
              <p className="text-center text-base md:text-lg text-slate-900 mb-8 uppercase tracking-wider font-semibold">
                {data.title}
              </p>
            )}
            {data.subtitle && (
              <p className="text-center text-sm md:text-base text-slate-600 mb-16 font-light italic">
                {data.subtitle}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="aspect-[3/2] bg-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity border border-gray-200 p-4"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'trust' && (
        <EditModal title="Trust Section bearbeiten">
          <TrustSectionEditor
            sectionKey="trust"
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


