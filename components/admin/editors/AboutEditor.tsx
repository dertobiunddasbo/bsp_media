'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface AboutData {
  title?: string
  subtitle?: string
  text1?: string
  text2?: string
  text3?: string
}

interface AboutEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: AboutData
  onSave: (data: AboutData) => Promise<void>
}

export default function AboutEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: AboutEditorProps) {
  const [data, setData] = useState<AboutData>(initialData || {})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData || {})
  }, [initialData])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('Error saving about:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Titel
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Untertitel
        </label>
        <input
          type="text"
          value={data.subtitle || ''}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 1
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text1 || ''}
          onEditorChange={(text: string) => setData({ ...data, text1: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 2
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text2 || ''}
          onEditorChange={(text: string) => setData({ ...data, text2: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 3
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text3 || ''}
          onEditorChange={(text: string) => setData({ ...data, text3: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Speichern...' : '💾 Änderungen speichern'}
        </button>
      </div>
    </div>
  )
}

