'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Page {
  id: string
  slug: string
  title: string
  description?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

const landingPageSlugs = ['mittelstand', 'immobilien-bau', 'corporate-high-end', 'agentur-partner', 'ideen-check']

const pageDisplayNames: Record<string, string> = {
  'mittelstand': 'Mittelstand',
  'immobilien-bau': 'Immobilien & Bau',
  'corporate-high-end': 'Corporate High-End',
  'agentur-partner': 'Agentur & Partner',
  'ideen-check': '24h Ideen-Check',
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages')
      if (!res.ok) throw new Error('Failed to fetch pages')
      const data = await res.json()
      
      // Filter to only show landing pages
      const landingPages = data.filter((page: Page) => landingPageSlugs.includes(page.slug))
      setPages(landingPages)
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Landing Pages verwalten</h1>
          <p className="text-gray-600">Bearbeite die Inhalte deiner Landing Pages</p>
        </div>
        <div className="text-gray-600">Wird geladen...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Landing Pages verwalten</h1>
        <p className="text-gray-600">Bearbeite die Inhalte deiner Landing Pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landingPageSlugs.map((slug) => {
          const page = pages.find(p => p.slug === slug)
          const displayName = pageDisplayNames[slug] || slug
          
          return (
            <Link
              key={slug}
              href={`/admin/pages/${slug}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-pink-600 rounded-lg flex items-center justify-center text-2xl">
                  📄
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
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{displayName}</h3>
              <p className="text-sm text-gray-500 mb-2">/{slug}</p>
              {page ? (
                <p className="text-sm text-gray-500">
                  Zuletzt aktualisiert: {page.updated_at || page.created_at
                    ? new Date(page.updated_at || page.created_at!).toLocaleDateString('de-DE')
                    : 'Unbekannt'}
                </p>
              ) : (
                <p className="text-sm text-gray-400">Noch nicht erstellt</p>
              )}
              {page && (
                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    page.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.is_active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-dark mb-2">💡 Hinweis</h3>
        <p className="text-sm text-gray-700">
          Klicke auf eine Landing Page, um deren Sections (Hero, FAQ, etc.) zu bearbeiten. Die Änderungen werden sofort auf der Website sichtbar.
        </p>
      </div>
    </div>
  )
}
