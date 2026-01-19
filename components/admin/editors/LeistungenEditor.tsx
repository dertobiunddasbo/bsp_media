'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Service {
  title: string
  description: string
  image: string
  backgroundVideo?: string
}

interface LeistungenData {
  title?: string
  subtitle?: string
  items?: Service[]
}

interface LeistungenEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: LeistungenData
  onSave: (data: LeistungenData) => Promise<void>
}

export default function LeistungenEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: LeistungenEditorProps) {
  const [data, setData] = useState<LeistungenData>(initialData || { items: [] })
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
      console.error('Error saving leistungen:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const updateItem = (index: number, field: keyof Service, value: string) => {
    const newItems = [...(data.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    setData({ ...data, items: newItems })
  }

  const addItem = () => {
    setData({
      ...data,
      items: [
        ...(data.items || []),
        { title: '', description: '', image: '', backgroundVideo: '' },
      ],
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...(data.items || [])]
    newItems.splice(index, 1)
    setData({ ...data, items: newItems })
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
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Untertitel
        </label>
        <input
          type="text"
          value={data.subtitle || ''}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Services/Leistungen
          </label>
          <button
            onClick={addItem}
            className="px-3 py-1 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90"
          >
            + Hinzufügen
          </button>
        </div>
        <div className="space-y-4">
          {(data.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Service {index + 1}
                </span>
                <button
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
                  placeholder="Titel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Beschreibung"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Bild
                  </label>
                  <div className="mb-2">
                    <ImageUpload
                      onUploadComplete={(url, path) => {
                        updateItem(index, 'image', url)
                      }}
                      onUploadError={(error) => {
                        console.error('Upload error:', error)
                        alert(`Upload fehlgeschlagen: ${error}`)
                      }}
                      folder="pictures"
                      maxSize={10}
                      buttonText="Bild hochladen"
                      className="text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Oder URL eingeben:
                    </label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => updateItem(index, 'image', e.target.value)}
                      placeholder="Bild URL (Fallback)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    />
                  </div>
                  {item.image && !item.backgroundVideo && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={item.backgroundVideo || ''}
                  onChange={(e) => updateItem(index, 'backgroundVideo', e.target.value)}
                  placeholder="Video URL (MP4) - optional, hat Vorrang vor Bild"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent mt-2"
                />
                {item.backgroundVideo && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <video
                      src={item.backgroundVideo}
                      className="w-full h-32 object-cover"
                      muted
                      loop
                      playsInline
                      controls
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {item.backgroundVideo ? 'Video wird verwendet' : 'Bild wird verwendet (Video hat Vorrang)'}
                </p>
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

