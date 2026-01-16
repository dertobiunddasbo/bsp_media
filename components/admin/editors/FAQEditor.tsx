'use client'

import { useState, useEffect } from 'react'
import { FAQData } from '@/lib/types'

interface FAQEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: FAQData
  onSave: (data: FAQData) => Promise<void>
}

export default function FAQEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: FAQEditorProps) {
  const [data, setData] = useState<FAQData>(initialData || { items: [] })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData || { items: [] })
  }, [initialData])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('Error saving FAQ:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...(data.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    setData({ ...data, items: newItems })
  }

  const addItem = () => {
    setData({
      ...data,
      items: [
        ...(data.items || []),
        { question: '', answer: '' },
      ],
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...(data.items || [])]
    newItems.splice(index, 1)
    setData({ ...data, items: newItems })
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
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Fragen & Antworten
          </label>
          <button
            onClick={addItem}
            className="px-3 py-1 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90"
          >
            + Hinzufügen
          </button>
        </div>
        <div className="space-y-4">
          {(data.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Frage {index + 1}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Entfernen
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateItem(index, 'question', e.target.value)}
                  placeholder="Frage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateItem(index, 'answer', e.target.value)}
                  placeholder="Antwort"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
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
