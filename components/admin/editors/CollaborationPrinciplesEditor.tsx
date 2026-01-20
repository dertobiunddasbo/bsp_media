'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getTinyMCEConfig } from '@/lib/tinymce-config'
import { CollaborationPrinciplesData } from '@/lib/types'

interface CollaborationPrinciplesEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: CollaborationPrinciplesData
  onSave: (data: CollaborationPrinciplesData) => Promise<void>
}

export default function CollaborationPrinciplesEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: CollaborationPrinciplesEditorProps) {
  const [data, setData] = useState<CollaborationPrinciplesData>(initialData || {})
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
      console.error('Error saving principles:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const addPrinciple = () => {
    setData({
      ...data,
      principles: [...(data.principles || []), { title: '', description: '', gradient: 'from-accent to-pink-600' }],
    })
  }

  const removePrinciple = (index: number) => {
    const newPrinciples = [...(data.principles || [])]
    newPrinciples.splice(index, 1)
    setData({ ...data, principles: newPrinciples })
  }

  const updatePrinciple = (index: number, field: 'title' | 'description' | 'gradient', value: string) => {
    const newPrinciples = [...(data.principles || [])]
    newPrinciples[index] = { ...newPrinciples[index], [field]: value }
    setData({ ...data, principles: newPrinciples })
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
          placeholder="Das ist uns wichtig:"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Prinzipien
          </label>
          <button
            onClick={addPrinciple}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            + Prinzip hinzufügen
          </button>
        </div>
        <div className="space-y-4">
          {(data.principles || []).map((principle, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Prinzip {index + 1}</span>
                <button
                  onClick={() => removePrinciple(index)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                value={principle.title}
                onChange={(e) => updatePrinciple(index, 'title', e.target.value)}
                placeholder="Titel"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Beschreibung (HTML erlaubt)
                </label>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
                  value={principle.description}
                  onEditorChange={(text: string) => updatePrinciple(index, 'description', text)}
                  init={getTinyMCEConfig(200)}
                />
              </div>
              <input
                type="text"
                value={principle.gradient}
                onChange={(e) => updatePrinciple(index, 'gradient', e.target.value)}
                placeholder="from-accent to-pink-600"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              />
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


