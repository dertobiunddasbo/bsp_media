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
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPage, setNewPage] = useState({ slug: '', title: '', description: '' })
  const [creating, setCreating] = useState(false)

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

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      // Validate slug format (lowercase, no spaces, only letters, numbers, hyphens)
      const slug = newPage.slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      
      if (!slug || !newPage.title.trim()) {
        alert('Bitte fülle alle Pflichtfelder aus')
        setCreating(false)
        return
      }

      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title: newPage.title.trim(),
          description: newPage.description.trim() || null,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Fehler beim Erstellen')
      }

      // Reset form and close modal
      setNewPage({ slug: '', title: '', description: '' })
      setShowCreateModal(false)
      loadPages()
      alert('Seite erfolgreich erstellt!')
    } catch (error: any) {
      console.error('Error creating page:', error)
      alert(error.message || 'Fehler beim Erstellen der Seite')
    } finally {
      setCreating(false)
    }
  }

  const handleDeletePage = async (page: Page) => {
    if (!confirm(`Möchtest du die Seite "${page.title}" wirklich löschen?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/pages?id=${page.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Fehler beim Löschen')
      }

      loadPages()
      alert('Seite erfolgreich gelöscht!')
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('Fehler beim Löschen der Seite')
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-dark">Seiten verwalten</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors"
          >
            + Neue Seite erstellen
          </button>
          <Link
            href="/admin"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-light"
          >
            ← Zurück zum Dashboard
          </Link>
        </div>
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-2xl font-semibold text-dark mb-6">Neue Seite erstellen</h2>
            
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="z.B. Über uns"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="z.B. ueber-uns"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Wird automatisch formatiert (Kleinbuchstaben, Bindestriche)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beschreibung (optional)
                </label>
                <textarea
                  value={newPage.description}
                  onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Kurze Beschreibung der Seite"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {creating ? 'Erstelle...' : 'Seite erstellen'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setNewPage({ slug: '', title: '', description: '' })
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    <button
                      onClick={() => handleDeletePage(page)}
                      className="text-red-600 hover:text-red-800 font-light text-sm"
                    >
                      Löschen
                    </button>
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

