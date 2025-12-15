'use client'

import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface ContentData {
  hero: {
    title: string
    subtitle: string
  }
  leistungen: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
    }>
  }
  about: {
    title: string
    subtitle: string
    text1: string
    text2: string
    text3: string
  }
  footer: {
    address: string
    email: string
  }
  header: {
    navigation: Array<{
      label: string
      href: string
    }>
  }
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'leistungen' | 'about' | 'footer' | 'header'>('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ContentData>({
    hero: { title: '', subtitle: '' },
    leistungen: { title: '', subtitle: '', items: [] },
    about: { title: '', subtitle: '', text1: '', text2: '', text3: '' },
    footer: { address: '', email: '' },
    header: { navigation: [] },
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const sections = ['hero', 'leistungen', 'about', 'footer', 'header']
      const loadedContent: any = {}

      for (const section of sections) {
        const res = await fetch(`/api/admin/content?section=${section}`)
        const data = await res.json()
        if (data) {
          loadedContent[section] = data.content
        }
      }

      setContent((prev) => ({ ...prev, ...loadedContent }))
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSection = async (section: string) => {
    setSaving(true)
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_section: section,
          content: content[section as keyof ContentData],
        }),
      })
      alert('Gespeichert!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-dark mb-8">Content bearbeiten</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 border-b border-gray-200">
        {(['hero', 'leistungen', 'about', 'footer', 'header'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={content.hero.title || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Untertitel</label>
            <input
              type="text"
              value={content.hero.subtitle || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button
            onClick={() => saveSection('hero')}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )}

      {/* Leistungen Tab */}
      {activeTab === 'leistungen' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={content.leistungen.title || ''}
              onChange={(e) => setContent({ ...content, leistungen: { ...content.leistungen, title: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Untertitel</label>
            <input
              type="text"
              value={content.leistungen.subtitle || ''}
              onChange={(e) => setContent({ ...content, leistungen: { ...content.leistungen, subtitle: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button
            onClick={() => saveSection('leistungen')}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={content.about.title || ''}
              onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Text 1</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
              value={content.about.text1 || ''}
              onEditorChange={(text) => setContent({ ...content, about: { ...content.about, text1: text } })}
              init={{
                height: 200,
                menubar: false,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
                toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Text 2</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
              value={content.about.text2 || ''}
              onEditorChange={(text) => setContent({ ...content, about: { ...content.about, text2: text } })}
              init={{
                height: 200,
                menubar: false,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
                toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Text 3</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
              value={content.about.text3 || ''}
              onEditorChange={(text) => setContent({ ...content, about: { ...content.about, text3: text } })}
              init={{
                height: 200,
                menubar: false,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
                toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
              }}
            />
          </div>
          <button
            onClick={() => saveSection('about')}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )}

      {/* Footer Tab */}
      {activeTab === 'footer' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
            <textarea
              value={content.footer.address || ''}
              onChange={(e) => setContent({ ...content, footer: { ...content.footer, address: e.target.value } })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-Mail</label>
            <input
              type="email"
              value={content.footer.email || ''}
              onChange={(e) => setContent({ ...content, footer: { ...content.footer, email: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button
            onClick={() => saveSection('footer')}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      )}

      {/* Header Tab */}
      {activeTab === 'header' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <p className="text-gray-600 font-extralight">
            Header-Navigation wird aktuell noch nicht dynamisch verwaltet. Bitte direkt im Code bearbeiten.
          </p>
        </div>
      )}
    </div>
  )
}

