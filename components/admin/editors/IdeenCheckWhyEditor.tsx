'use client'

import { useState, useEffect } from 'react'
import type { IdeenCheckWhyData } from '@/lib/types'

interface IdeenCheckWhyEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: IdeenCheckWhyData
  onSave: (data: IdeenCheckWhyData) => Promise<void>
}

export default function IdeenCheckWhyEditor({
  initialData,
  onSave,
}: IdeenCheckWhyEditorProps) {
  const [data, setData] = useState<IdeenCheckWhyData>(initialData || { text: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData?.text != null ? initialData : { text: '' })
  }, [initialData])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey: 'ideen_check_why' } }))
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
        Der Abschnitt „Warum wir das machen?“ – die ehrliche Antwort.
      </p>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Text</label>
        <textarea
          value={data.text || ''}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          placeholder="Warum wir das tun? Weil wir an gute Geschichten glauben..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
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
