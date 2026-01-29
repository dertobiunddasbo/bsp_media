'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import editors to avoid SSR issues
const HeroEditor = dynamic(() => import('@/components/admin/editors/HeroEditor'), { ssr: false })
const FAQEditor = dynamic(() => import('@/components/admin/editors/FAQEditor'), { ssr: false })
const TestimonialsEditor = dynamic(() => import('@/components/admin/editors/TestimonialsEditor'), { ssr: false })
const LeistungenEditor = dynamic(() => import('@/components/admin/editors/LeistungenEditor'), { ssr: false })
const IdeenCheckPromiseEditor = dynamic(() => import('@/components/admin/editors/IdeenCheckPromiseEditor'), { ssr: false })
const IdeenCheckWhyEditor = dynamic(() => import('@/components/admin/editors/IdeenCheckWhyEditor'), { ssr: false })
const IdeenCheckProductEditor = dynamic(() => import('@/components/admin/editors/IdeenCheckProductEditor'), { ssr: false })

const sectionNames: Record<string, string> = {
  hero: 'Hero Section',
  leistungen: 'Leistungen',
  faq: 'FAQ',
  testimonials: 'Testimonials',
  ideen_check_promise: 'Fair-Play Versprechen',
  ideen_check_why: 'Warum wir das machen',
  ideen_check_product: 'Produkt-Preview (Antwort-Beispiele)',
}

const editorComponents: Record<string, any> = {
  hero: HeroEditor,
  leistungen: LeistungenEditor,
  faq: FAQEditor,
  testimonials: TestimonialsEditor,
  ideen_check_promise: IdeenCheckPromiseEditor,
  ideen_check_why: IdeenCheckWhyEditor,
  ideen_check_product: IdeenCheckProductEditor,
}

interface PageSection {
  id: string
  section_key: string
  content: any
  order_index: number
  updated_at?: string
  created_at?: string
}

const pageDisplayNames: Record<string, string> = {
  'mittelstand': 'Mittelstand',
  'immobilien-bau': 'Immobilien & Bau',
  'corporate-high-end': 'Corporate High-End',
  'agentur-partner': 'Agentur & Partner',
  'ideen-check': '24h Ideen-Check',
}

export default function PageEditPage() {
  const params = useParams()
  const router = useRouter()
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string)
  const [sections, setSections] = useState<PageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [sectionData, setSectionData] = useState<any>(null)

  useEffect(() => {
    if (slug) {
      fetchSections()
    }
  }, [slug])

  const fetchSections = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${slug}/sections`)
      if (!res.ok) throw new Error('Failed to fetch sections')
      const data = await res.json()
      setSections(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadSectionData = async (sectionKey: string) => {
    try {
      const res = await fetch(`/api/admin/pages/${slug}/sections?section_key=${sectionKey}`)
      if (!res.ok) throw new Error('Failed to fetch section data')
      const data = await res.json()
      setSectionData(data)
      setSelectedSection(sectionKey)
    } catch (error) {
      console.error('Error fetching section data:', error)
      alert('Fehler beim Laden der Section-Daten')
    }
  }

  const handleSave = async (sectionKey: string, newData: any) => {
    try {
      const res = await fetch(`/api/admin/pages/${slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: sectionKey,
          content: newData,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Fehler beim Speichern')
      }

      alert('Gespeichert!')
      await fetchSections()
      setSelectedSection(null)
      setSectionData(null)
    } catch (error: any) {
      console.error('Error saving section:', error)
      alert(`Fehler beim Speichern: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <Link
            href="/admin/pages"
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zu Landing Pages
          </Link>
          <h1 className="text-4xl font-bold text-dark mb-2">Wird geladen...</h1>
        </div>
      </div>
    )
  }

  const displayName = pageDisplayNames[slug] || slug
  const existingSections = new Map(sections.map(s => [s.section_key, s]))

  // Sections per page type: ideen-check has its own set
  const ideenCheckSectionKeys = ['hero', 'ideen_check_promise', 'ideen_check_why', 'ideen_check_product']
  const defaultSectionKeys = ['hero', 'leistungen', 'faq', 'testimonials']
  const sectionKeysForPage = slug === 'ideen-check' ? ideenCheckSectionKeys : defaultSectionKeys

  const allSections = sectionKeysForPage.map(key => ({
    key,
    name: sectionNames[key] ?? key,
    data: existingSections.get(key),
  }))

  // If a section is selected, show the editor
  if (selectedSection) {
    const EditorComponent = editorComponents[selectedSection]

    if (!EditorComponent) {
      return (
        <div>
          <div className="mb-8">
            <button
              onClick={() => {
                setSelectedSection(null)
                setSectionData(null)
              }}
              className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>
            <h1 className="text-4xl font-bold text-dark mb-2">
              {sectionNames[selectedSection] || selectedSection} bearbeiten
            </h1>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <p className="text-yellow-800">
              Editor für diese Section ist noch nicht verfügbar.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedSection(null)
              setSectionData(null)
            }}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zu {displayName}
          </button>
          <h1 className="text-4xl font-bold text-dark mb-2">
            {displayName} - {sectionNames[selectedSection]} bearbeiten
          </h1>
          <p className="text-gray-600">Bearbeite die Inhalte dieser Section</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <EditorComponent
            sectionKey={selectedSection}
            pageSlug={slug}
            initialData={sectionData}
            onSave={(data: any) => handleSave(selectedSection, data)}
          />
        </div>
      </div>
    )
  }

  // Show section list
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/pages"
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zu Landing Pages
        </Link>
        <h1 className="text-4xl font-bold text-dark mb-2">{displayName} bearbeiten</h1>
        <p className="text-gray-600">Bearbeite die Sections dieser Landing Page</p>
        <div className="mt-4">
          <Link
            href={`/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Seite ansehen
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSections.map((section) => (
          <button
            key={section.key}
            onClick={() => loadSectionData(section.key)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
                📝
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.name}</h3>
            {section.data ? (
              <p className="text-sm text-gray-500">
                Zuletzt aktualisiert: {section.data.updated_at || section.data.created_at
                  ? new Date(section.data.updated_at || section.data.created_at!).toLocaleDateString('de-DE')
                  : 'Unbekannt'}
              </p>
            ) : (
              <p className="text-sm text-gray-400">Noch nicht erstellt</p>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-dark mb-2">💡 Hinweis</h3>
        <p className="text-sm text-gray-700">
          Klicke auf eine Section, um deren Inhalte zu bearbeiten. Die Änderungen werden sofort auf der Website sichtbar.
        </p>
      </div>
    </div>
  )
}
