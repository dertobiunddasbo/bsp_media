/**
 * Why Us Section Component
 * Displays company USPs with edit mode support
 * Inspired by Gronlander design
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useEditMode } from '@/contexts/EditModeContext'
import { WhyUsData } from '@/lib/types'
import { getSectionContent, defaultWhyUsData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import WhyUsEditor from '@/components/admin/editors/WhyUsEditor'

interface WhyUsProps {
  pageSlug?: string
}

export default function WhyUs({ pageSlug = 'home' }: WhyUsProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<WhyUsData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('whyus', pageSlug)
    setData(content || defaultWhyUsData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: WhyUsData) => {
    try {
      const success = await saveSection('whyus', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for whyus section')
      }
    } catch (error) {
      console.error('Error saving whyus:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

  if (loading || !data) {
    return (
      <section className="py-40 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const items = data.items || []

  return (
    <>
      <EditableSection sectionKey="whyus">
        <section className="py-40 bg-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="mb-32">
              {data.title && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-12 tracking-tight leading-[1.05]">
                  {data.title}
                </h2>
              )}
            </div>

            <div className="space-y-32">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                  {/* Number + Title (Left) */}
                  <div className="lg:col-span-4">
                    <div className="mb-8">
                      <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-slate-200 leading-none">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-6">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description + Link (Right) */}
                  <div className="lg:col-span-8">
                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light mb-8 max-w-3xl">
                      {item.description}
                    </p>
                    {item.linkText && item.linkUrl && (
                      <Link
                        href={item.linkUrl}
                        className="inline-flex items-center text-accent font-light text-base md:text-lg hover:gap-3 transition-all duration-300 group"
                      >
                        <span>{item.linkText}</span>
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'whyus' && (
        <EditModal title="Why Us Section bearbeiten">
          <WhyUsEditor
            sectionKey="whyus"
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
