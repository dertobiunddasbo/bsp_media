'use client'

import { useState, useEffect } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'

interface HeroData {
  badge?: string
  title?: string
  subtitle?: string
  buttonText?: string
  backgroundImage?: string
}

interface HeroEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: HeroData
  onSave: (data: HeroData) => Promise<void>
}

export default function HeroEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: HeroEditorProps) {
  const [data, setData] = useState<HeroData>(initialData || {})
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
      console.error('Error saving hero:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Badge/Label
        </label>
        <input
          type="text"
          value={data.badge || ''}
          onChange={(e) => setData({ ...data, badge: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Filmproduktion Hamburg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Titel
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="High-End Kommunikation..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Untertitel
        </label>
        <textarea
          value={data.subtitle || ''}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Wir bringen Ihre Strategie..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Button Text
        </label>
        <input
          type="text"
          value={data.buttonText || ''}
          onChange={(e) => setData({ ...data, buttonText: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Verfügbarkeit prüfen"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hintergrundbild URL
        </label>
        <input
          type="text"
          value={data.backgroundImage || ''}
          onChange={(e) => setData({ ...data, backgroundImage: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="https://..."
        />
        {data.backgroundImage && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={data.backgroundImage}
              alt="Preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
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

