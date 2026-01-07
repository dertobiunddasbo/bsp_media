'use client'

import { useEditMode } from '@/contexts/EditModeContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditModeBar() {
  const { isEditMode, disableEditMode, pageSlug } = useEditMode()
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  if (!isEditMode) return null

  const handleSave = async () => {
    setSaving(true)
    // Trigger save event - components will handle their own saves
    window.dispatchEvent(new CustomEvent('editMode:save'))
    setSaving(false)
    // Small delay to show feedback
    setTimeout(() => {
      alert('Änderungen gespeichert!')
    }, 100)
  }

  const handleExit = () => {
    disableEditMode()
    router.push(pageSlug ? `/${pageSlug}` : '/')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-accent text-white px-6 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">✏️ Bearbeitungsmodus</span>
          <span className="text-sm opacity-90">
            {pageSlug ? `Seite: ${pageSlug}` : 'Startseite'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichern...' : '💾 Speichern'}
          </button>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
          >
            ❌ Beenden
          </button>
        </div>
      </div>
    </div>
  )
}

