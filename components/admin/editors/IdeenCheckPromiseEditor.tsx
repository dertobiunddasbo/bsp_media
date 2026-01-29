'use client'

import { useState, useEffect } from 'react'
import type { IdeenCheckPromiseData } from '@/lib/types'

interface IdeenCheckPromiseEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: IdeenCheckPromiseData
  onSave: (data: IdeenCheckPromiseData) => Promise<void>
}

export default function IdeenCheckPromiseEditor({
  initialData,
  onSave,
}: IdeenCheckPromiseEditorProps) {
  const [data, setData] = useState<IdeenCheckPromiseData>(initialData || { items: [] })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData?.items?.length ? initialData : { items: [] })
  }, [initialData])

  const updateItem = (index: number, field: 'title' | 'text', value: string) => {
    const items = [...(data.items || [])]
    items[index] = { ...items[index], [field]: value }
    setData({ ...data, items })
  }

  const addItem = () => {
    setData({
      ...data,
      items: [...(data.items || []), { title: '', text: '' }],
    })
  }

  const removeItem = (index: number) => {
    const items = [...(data.items || [])]
    items.splice(index, 1)
    setData({ ...data, items })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey: 'ideen_check_promise' } }))
    } catch (error) {
      console.error('Error saving:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Fair-Play-Versprechen: die drei Vertrauensanker (Titel + Text).
      </p>
      <div className="space-y-4">
        {(data.items || []).map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Punkt {index + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Entfernen
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                placeholder="Titel (z.B. Kein Verkaufsgespräch)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <textarea
                value={item.text}
                onChange={(e) => updateItem(index, 'text', e.target.value)}
                placeholder="Text"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="px-3 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90"
      >
        + Punkt hinzufügen
      </button>
      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? 'Speichern...' : '💾 Änderungen speichern'}
        </button>
      </div>
    </div>
  )
}
