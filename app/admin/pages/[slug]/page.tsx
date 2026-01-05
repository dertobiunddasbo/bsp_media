'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'
import Link from 'next/link'

interface PageSection {
  id: string
  section_key: string
  content: any
  order_index: number
}

interface Page {
  id: string
  slug: string
  title: string
  description: string | null
  sections: PageSection[]
}

export default function PageEditor() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState<Page | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    loadPage()
  }, [slug])

  const loadPage = async () => {
    try {
      const res = await fetch(`/api/admin/pages?slug=${slug}`)
      const data = await res.json()
      setPage(data)
      if (data.sections && data.sections.length > 0) {
        setActiveSection(data.sections[0].section_key)
      }
    } catch (error) {
      console.error('Error loading page:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSection = async (sectionKey: string, content: any) => {
    setSaving(true)
    try {
      await fetch(`/api/admin/pages/${slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: sectionKey,
          content,
        }),
      })
      
      // Reload page to get updated data
      await loadPage()
      alert('Gespeichert!')
    } catch (error) {
      console.error('Error saving section:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const updateSectionContent = (sectionKey: string, field: string, value: any) => {
    if (!page) return

    const section = page.sections.find(s => s.section_key === sectionKey)
    if (section) {
      section.content = { ...section.content, [field]: value }
      setPage({ ...page })
    } else {
      // Create new section
      const newSection: PageSection = {
        id: '',
        section_key: sectionKey,
        content: { [field]: value },
        order_index: page.sections.length,
      }
      setPage({ ...page, sections: [...page.sections, newSection] })
    }
  }

  const renderSectionEditor = (sectionKey: string) => {
    const section = page?.sections.find(s => s.section_key === sectionKey)
    const content = section?.content || {}

    // Leistungen Section Editor
    if (sectionKey === 'leistungen') {
      const items = content.items || []
      
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Untertitel</label>
            <input
              type="text"
              value={content.subtitle || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'subtitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Titel</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].title = e.target.value
                          updateSectionContent(sectionKey, 'items', newItems)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Bild-URL</label>
                      <input
                        type="text"
                        value={item.image || ''}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].image = e.target.value
                          updateSectionContent(sectionKey, 'items', newItems)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Beschreibung</label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => {
                        const newItems = [...items]
                        newItems[index].description = e.target.value
                        updateSectionContent(sectionKey, 'items', newItems)
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newItems = items.filter((_: any, i: number) => i !== index)
                      updateSectionContent(sectionKey, 'items', newItems)
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Entfernen
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...items, { title: '', description: '', image: '' }]
                  updateSectionContent(sectionKey, 'items', newItems)
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-accent hover:text-accent transition-colors"
              >
                + Service hinzufügen
              </button>
            </div>
          </div>

          <button
            onClick={() => saveSection(sectionKey, content)}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )
    }

    // Hero Section Editor
    if (sectionKey === 'hero') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={content.badge || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'badge', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Haupttitel</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Untertitel</label>
            <textarea
              value={content.subtitle || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'subtitle', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
            <input
              type="text"
              value={content.buttonText || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'buttonText', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hintergrundbild-URL</label>
            <input
              type="text"
              value={content.backgroundImage || ''}
              onChange={(e) => updateSectionContent(sectionKey, 'backgroundImage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            onClick={() => saveSection(sectionKey, content)}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )
    }

    // Generic JSON Editor for other sections
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content (JSON)</label>
          <textarea
            value={JSON.stringify(content, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                updateSectionContent(sectionKey, '', parsed)
              } catch (err) {
                // Invalid JSON, ignore
              }
            }}
            rows={20}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          onClick={() => saveSection(sectionKey, content)}
          disabled={saving}
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Speichert...' : 'Speichern'}
        </button>
      </div>
    )
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  if (!page) {
    return <div className="text-gray-600">Seite nicht gefunden</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/pages"
            className="text-gray-600 hover:text-gray-900 font-light text-sm mb-2 inline-block"
          >
            ← Zurück zu Seiten
          </Link>
          <h1 className="text-3xl font-semibold text-dark">{page.title} bearbeiten</h1>
        </div>
        <Link
          href={page.slug === 'home' ? '/' : `/${page.slug}`}
          target="_blank"
          className="text-gray-600 hover:text-gray-900 font-light text-sm"
        >
          Seite ansehen →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with sections */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Sections</h2>
            <div className="space-y-2">
              {page.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.section_key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.section_key
                      ? 'bg-accent/10 text-accent font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.section_key}
                </button>
              ))}
              <button
                onClick={() => {
                  const newSectionKey = prompt('Section-Key eingeben:')
                  if (newSectionKey) {
                    const newSection: PageSection = {
                      id: '',
                      section_key: newSectionKey,
                      content: {},
                      order_index: page.sections.length,
                    }
                    setPage({ ...page, sections: [...page.sections, newSection] })
                    setActiveSection(newSectionKey)
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 border-2 border-dashed border-gray-300"
              >
                + Section hinzufügen
              </button>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3">
          {activeSection ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-semibold text-dark mb-6 capitalize">{activeSection}</h2>
              {renderSectionEditor(activeSection)}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-600">
              Wählen Sie eine Section aus
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

