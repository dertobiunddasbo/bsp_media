/**
 * Footer Section Component
 * Displays footer with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { FooterData } from '@/lib/types'
import { getSectionContent, defaultFooterData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import FooterEditor from '@/components/admin/editors/FooterEditor'
import Link from 'next/link'

interface FooterProps {
  pageSlug?: string
}

export default function Footer({ pageSlug = 'home' }: FooterProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<FooterData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('footer', pageSlug)
    setData(content || defaultFooterData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: FooterData) => {
    try {
      const success = await saveSection('footer', newData, pageSlug)
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert('Fehler beim Speichern. Bitte versuche es erneut.')
        console.error('Save failed for footer section')
      }
    } catch (error) {
      console.error('Error saving footer:', error)
      alert('Fehler beim Speichern: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

  if (loading || !data) {
    return (
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-400">Wird geladen...</div>
        </div>
      </footer>
    )
  }

  return (
    <>
      <EditableSection sectionKey="footer">
        <footer id="contact" className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Logo & Adresse */}
              <div>
                <Link href="/" className="inline-block mb-6">
                  <img
                    src="/logo.png"
                    alt="BSP MEDIA"
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                {data.address && (
                  <p className="text-gray-400 font-extralight leading-relaxed whitespace-pre-line">
                    {data.address}
                  </p>
                )}
              </div>

              {/* Kontakt */}
              <div>
                <h3 className="font-semibold mb-4 text-white">Kontakt</h3>
                <div className="space-y-3">
                  <Link
                    href="/termin"
                    className="block text-accent hover:text-accent/80 transition-colors font-semibold mb-2"
                  >
                    📅 Termin vereinbaren
                  </Link>
                  {data.email && (
                    <a
                      href={`mailto:${data.email}`}
                      className="block text-gray-400 hover:text-accent transition-colors font-extralight"
                    >
                      {data.email}
                    </a>
                  )}
                  <Link
                    href="/kontakt"
                    className="block text-gray-400 hover:text-accent transition-colors font-extralight"
                  >
                    Kontaktformular
                  </Link>
                </div>
              </div>

              {/* Rechtliches */}
              <div>
                <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
                <div className="space-y-3">
                  <Link
                    href="/impressum"
                    className="block text-gray-400 hover:text-accent transition-colors font-extralight"
                  >
                    Impressum
                  </Link>
                  <Link
                    href="/datenschutz"
                    className="block text-gray-400 hover:text-accent transition-colors font-extralight"
                  >
                    Datenschutz
                  </Link>
                  <Link
                    href="/agb"
                    className="block text-gray-400 hover:text-accent transition-colors font-extralight"
                  >
                    AGB
                  </Link>
                </div>
              </div>
            </div>

            {/* Copyright */}
            {data.copyright && (
              <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm font-extralight">
                {data.copyright}
              </div>
            )}
          </div>
        </footer>
      </EditableSection>

      {isEditMode && editingSection === 'footer' && (
        <EditModal title="Footer Section bearbeiten">
          <FooterEditor
            sectionKey="footer"
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


