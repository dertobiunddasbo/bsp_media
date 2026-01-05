'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Page {
  id: string
  slug: string
  title: string
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export const dynamic = 'force-dynamic'

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const res = await fetch('/api/admin/pages')
      const data = await res.json()
      setPages(data)
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (page: Page) => {
    try {
      await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: page.id,
          slug: page.slug,
          title: page.title,
          description: page.description,
          is_active: !page.is_active,
        }),
      })
      loadPages()
    } catch (error) {
      console.error('Error updating page:', error)
      alert('Fehler beim Aktualisieren')
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-dark">Seiten verwalten</h1>
        <Link
          href="/admin"
          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-light"
        >
          ← Zurück zum Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Seite</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-dark">{page.title}</div>
                  {page.description && (
                    <div className="text-sm text-gray-600 font-extralight mt-1">
                      {page.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    /{page.slug === 'home' ? '' : page.slug}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(page)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      page.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {page.is_active ? 'Aktiv' : 'Inaktiv'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="text-accent hover:text-accent/80 font-semibold text-sm"
                    >
                      Bearbeiten
                    </Link>
                    <Link
                      href={page.slug === 'home' ? '/' : `/${page.slug}`}
                      target="_blank"
                      className="text-gray-600 hover:text-gray-900 font-light text-sm"
                    >
                      Ansehen →
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

