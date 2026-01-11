'use client'

import { useState, useEffect } from 'react'
import { FooterData } from '@/lib/types'

interface FooterEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: FooterData
  onSave: (data: FooterData) => Promise<void>
}

export default function FooterEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: FooterEditorProps) {
  const [data, setData] = useState<FooterData>(initialData || {})
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
      console.error('Error saving footer:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Adresse (Zeilenumbruch mit Enter)
        </label>
        <textarea
          value={data.address || ''}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="bsp media GmbH&#10;Sillemstraße 76a&#10;20257 Hamburg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          E-Mail
        </label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="hallo@bsp-media.de"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Copyright
        </label>
        <input
          type="text"
          value={data.copyright || ''}
          onChange={(e) => setData({ ...data, copyright: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="© 2025 bsp media GmbH. Alle Rechte vorbehalten."
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


