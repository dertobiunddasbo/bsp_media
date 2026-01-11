/**
 * NDA Disclaimer Section Component
 * Displays trust and security information with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { NDADisclaimerData } from '@/lib/types'
import { getSectionContent, defaultNDADisclaimerData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import NDADisclaimerEditor from '@/components/admin/editors/NDADisclaimerEditor'
import Link from 'next/link'

interface NDADisclaimerProps {
  pageSlug?: string
}

export default function NDADisclaimer({ pageSlug = 'home' }: NDADisclaimerProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<NDADisclaimerData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('nda', pageSlug)
    setData(content || defaultNDADisclaimerData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: NDADisclaimerData) => {
    try {
      const success = await saveSection('nda', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for nda section')
      }
    } catch (error) {
      console.error('Error saving nda:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

  if (loading || !data) {
    return (
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-white">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const items = data.items || []

  return (
    <>
      <EditableSection sectionKey="nda">
        <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              {data.badge && (
                <div className="inline-block mb-6 px-5 py-2 bg-accent/10 rounded-full text-sm font-light text-accent border border-accent/20">
                  {data.badge}
                </div>
              )}
              {data.title && (
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight"
                  dangerouslySetInnerHTML={{ __html: data.title.replace(/className=/g, 'class=') }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {items.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
                  <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              ))}
            </div>

            {data.ctaText && (
              <div className="text-center">
                <p className="text-gray-400 text-sm font-light">
                  Haben Sie Fragen zu Datenschutz oder Vertraulichkeit?{' '}
                  <Link href={data.ctaLink || '/kontakt'} className="text-accent hover:text-accent/80 underline transition-colors">
                    {data.ctaText}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'nda' && (
        <EditModal title="NDA Disclaimer Section bearbeiten">
          <NDADisclaimerEditor
            sectionKey="nda"
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

