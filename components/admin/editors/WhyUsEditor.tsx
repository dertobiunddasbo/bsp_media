'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getTinyMCEConfig } from '@/lib/tinymce-config'
import { useEditMode } from '@/contexts/EditModeContext'
import { WhyUsData } from '@/lib/types'

interface WhyUsEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: WhyUsData
  onSave: (data: WhyUsData) => Promise<void>
}

export default function WhyUsEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: WhyUsEditorProps) {
  const [data, setData] = useState<WhyUsData>(initialData || { items: [] })
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
      console.error('Error saving whyus:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    setData({
      ...data,
      items: [
        ...(data.items || []),
        {
          number: String((data.items?.length || 0) + 1).padStart(2, '0'),
          title: '',
          description: '',
          linkText: '',
          linkUrl: '',
        },
      ],
    })
  }

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...(data.items || [])]
    items[index] = { ...items[index], [field]: value }
    setData({ ...data, items })
  }

  const removeItem = (index: number) => {
    const items = [...(data.items || [])]
    items.splice(index, 1)
    // Re-number items
    items.forEach((item, idx) => {
      item.number = String(idx + 1).padStart(2, '0')
    })
    setData({ ...data, items })
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
          placeholder="Warum BSP Media?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Untertitel (optional)
        </label>
        <input
          type="text"
          value={data.subtitle || ''}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Was uns ausmacht"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            USP-Punkte
          </label>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-semibold"
          >
            + Punkt hinzufügen
          </button>
        </div>

        <div className="space-y-6">
          {(data.items || []).map((item, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Punkt {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Entfernen
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nummer
                </label>
                <input
                  type="text"
                  value={item.number}
                  onChange={(e) => updateItem(index, 'number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="01"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Titel
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Wir leben die Stories, die wir erzählen"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Beschreibung
                </label>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Beschreibung (HTML erlaubt)
                  </label>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
                    value={item.description}
                    onEditorChange={(text: string) => updateItem(index, 'description', text)}
                    init={getTinyMCEConfig(150)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={item.linkText || ''}
                    onChange={(e) => updateItem(index, 'linkText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    placeholder="Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={item.linkUrl || ''}
                    onChange={(e) => updateItem(index, 'linkUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    placeholder="/portfolio"
                  />
                </div>
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
