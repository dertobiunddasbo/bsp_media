'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { NDADisclaimerData } from '@/lib/types'

interface NDADisclaimerEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: NDADisclaimerData
  onSave: (data: NDADisclaimerData) => Promise<void>
}

export default function NDADisclaimerEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: NDADisclaimerEditorProps) {
  const [data, setData] = useState<NDADisclaimerData>(initialData || {})
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
      console.error('Error saving nda:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    setData({
      ...data,
      items: [...(data.items || []), { title: '', description: '' }],
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...(data.items || [])]
    newItems.splice(index, 1)
    setData({ ...data, items: newItems })
  }

  const updateItem = (index: number, field: 'title' | 'description', value: string) => {
    const newItems = [...(data.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    setData({ ...data, items: newItems })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Badge
        </label>
        <input
          type="text"
          value={data.badge || ''}
          onChange={(e) => setData({ ...data, badge: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Vertrauen & Sicherheit"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Titel (HTML erlaubt)
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.title || ''}
          onEditorChange={(text: string) => setData({ ...data, title: text })}
          init={{
            height: 150,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link'],
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
          }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Items
          </label>
          <button
            onClick={addItem}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            + Item hinzufügen
          </button>
        </div>
        <div className="space-y-4">
          {(data.items || []).map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Item {index + 1}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                placeholder="Titel"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
                value={item.description}
                onEditorChange={(text: string) => updateItem(index, 'description', text)}
                init={{
                  height: 150,
                  menubar: false,
                  plugins: ['advlist', 'autolink', 'lists', 'link'],
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          CTA Text
        </label>
        <input
          type="text"
          value={data.ctaText || ''}
          onChange={(e) => setData({ ...data, ctaText: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Sprechen Sie uns an"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          CTA Link
        </label>
        <input
          type="text"
          value={data.ctaLink || ''}
          onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="/kontakt"
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


