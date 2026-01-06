'use client'

import { useEditMode } from '@/contexts/EditModeContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageEditor from './PageEditor'

export default function EditModeBar() {
  const { isEditMode, disableEditMode, pageSlug, editingSection, setEditingSection } = useEditMode()
  const [saving, setSaving] = useState(false)
  const [showPageEditor, setShowPageEditor] = useState(false)
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

  // Close page editor when editingSection changes
  useEffect(() => {
    if (editingSection !== 'page') {
      setShowPageEditor(false)
    }
  }, [editingSection])

  const handleExit = () => {
    disableEditMode()
    router.push(pageSlug ? `/${pageSlug}` : '/')
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-accent text-white px-6 py-3 shadow-lg border-b-2 border-accent/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg">✏️ Bearbeitungsmodus aktiv</span>
            <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">
              {pageSlug ? `Seite: ${pageSlug}` : 'Startseite'}
            </span>
            <span className="text-xs opacity-75 hidden md:inline">
              → Hovern über Bereiche zeigt "Bearbeiten"-Button
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowPageEditor(true)
                setEditingSection('page')
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors border border-white/30"
            >
              📝 Ganze Seite bearbeiten
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-md"
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
      {showPageEditor && editingSection === 'page' && (
        <PageEditor 
          pageSlug={pageSlug || 'home'} 
        />
      )}
    </>
  )
}

