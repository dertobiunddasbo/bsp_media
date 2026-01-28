'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ContentSection {
  page_section: string
  content: any
  updated_at?: string
  created_at?: string
}

const sectionNames: Record<string, string> = {
  hero: 'Hero Section',
  leistungen: 'Leistungen',
  about: 'Über uns',
  trust: 'Trust Section',
  values: 'Werte',
  principles: 'Zusammenarbeit',
  nda: 'NDA Disclaimer',
  footer: 'Footer',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  whyus: 'Warum wir',
  team: 'Team',
}

export default function ContentPage() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/content')
      if (!res.ok) throw new Error('Failed to fetch content')
      const data = await res.json()
      setSections(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching sections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  // Create a map of existing sections
  const existingSections = new Map(sections.map(s => [s.page_section, s]))

  // Get all possible sections
  const allSections = Object.keys(sectionNames).map(key => ({
    key,
    name: sectionNames[key],
    data: existingSections.get(key),
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Content verwalten</h1>
        <p className="text-gray-600">Bearbeite die Inhalte deiner Website-Sections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSections.map((section) => (
          <Link
            key={section.key}
            href={`/admin/content/${section.key}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
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
          </Link>
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
