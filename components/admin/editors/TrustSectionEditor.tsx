'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getTinyMCEConfig } from '@/lib/tinymce-config'
import { TrustSectionData } from '@/lib/types'

interface TrustSectionEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: TrustSectionData
  onSave: (data: TrustSectionData) => Promise<void>
}

export default function TrustSectionEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: TrustSectionEditorProps) {
  const [data, setData] = useState<TrustSectionData>(initialData || {})
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
      console.error('Error saving trust section:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const addClient = () => {
    setData({
      ...data,
      clients: [...(data.clients || []), { name: '', logo: '' }],
    })
  }

  const removeClient = (index: number) => {
    const newClients = [...(data.clients || [])]
    newClients.splice(index, 1)
    setData({ ...data, clients: newClients })
  }

  const updateClient = (index: number, field: 'name' | 'logo', value: string) => {
    const newClients = [...(data.clients || [])]
    newClients[index] = { ...newClients[index], [field]: value }
    setData({ ...data, clients: newClients })
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
          placeholder="Vertrauen durch Erfahrung..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Untertitel
        </label>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Untertitel (HTML erlaubt)
          </label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
            value={data.subtitle || ''}
            onEditorChange={(text: string) => setData({ ...data, subtitle: text })}
            init={getTinyMCEConfig(120)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Client-Logos
          </label>
          <button
            onClick={addClient}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            + Logo hinzufügen
          </button>
        </div>
        <div className="space-y-3">
          {(data.clients || []).map((client, index) => (
            <div key={index} className="flex gap-3 items-start p-3 border border-gray-200 rounded-lg">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => updateClient(index, 'name', e.target.value)}
                  placeholder="Firmenname"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <input
                  type="text"
                  value={client.logo}
                  onChange={(e) => updateClient(index, 'logo', e.target.value)}
                  placeholder="/assets/logo.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={() => removeClient(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
              >
                ×
              </button>
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


