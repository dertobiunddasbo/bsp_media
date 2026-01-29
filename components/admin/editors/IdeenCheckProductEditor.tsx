'use client'

import { useState, useEffect } from 'react'
import type { IdeenCheckProductData } from '@/lib/types'

interface IdeenCheckProductEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: IdeenCheckProductData
  onSave: (data: IdeenCheckProductData) => Promise<void>
}

const TYPE_OPTIONS = [
  { value: 'thumb', label: 'Daumenwert' },
  { value: 'win', label: 'Quick-Win' },
  { value: 'warning', label: 'Warnlampe' },
]

export default function IdeenCheckProductEditor({
  initialData,
  onSave,
}: IdeenCheckProductEditorProps) {
  const [data, setData] = useState<IdeenCheckProductData>(initialData || { items: [] })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData?.items?.length ? initialData : { items: [] })
  }, [initialData])

  const updateItem = (index: number, field: 'type' | 'label' | 'example', value: string) => {
    const items = [...(data.items || [])]
    items[index] = { ...items[index], [field]: value }
    setData({ ...data, items })
  }

  const addItem = () => {
    setData({
      ...data,
      items: [...(data.items || []), { type: 'thumb', label: '', example: '' }],
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
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey: 'ideen_check_product' } }))
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
        Das „Produkt“ – Vorschau der Antwort (Daumenwert, Quick-Win, Warnlampe).
      </p>
      <div className="space-y-4">
        {(data.items || []).map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Beispiel {index + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Entfernen
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Typ</label>
                <select
                  value={item.type || 'thumb'}
                  onChange={(e) => updateItem(index, 'type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => updateItem(index, 'label', e.target.value)}
                placeholder="Label (z.B. Der Daumenwert)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <textarea
                value={item.example || ''}
                onChange={(e) => updateItem(index, 'example', e.target.value)}
                placeholder="Beispieltext in Anführungszeichen"
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
        + Beispiel hinzufügen
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
