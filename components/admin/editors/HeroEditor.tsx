'use client'

import { useState, useEffect } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { Editor } from '@tinymce/tinymce-react'
import ImageUpload from '@/components/ImageUpload'
import { getTinyMCEConfig } from '@/lib/tinymce-config'

interface HeroData {
  badge?: string
  title?: string
  subtitle?: string
  buttonText?: string
  backgroundImage?: string
  backgroundVideo?: string
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
      console.log('[HeroEditor] Saving data:', data)
      console.log('[HeroEditor] BackgroundImage:', data.backgroundImage)
      await onSave(data)
      console.log('[HeroEditor] Save completed successfully')
      
      // Report save result
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: true }
      }))
      
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('[HeroEditor] Error saving hero:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      
      // Report error
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: false, error: errorMessage }
      }))
      
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }
  
  // Listen for global save event
  useEffect(() => {
    const handleGlobalSave = async () => {
      await handleSave()
    }
    
    window.addEventListener('editMode:save', handleGlobalSave)
    return () => window.removeEventListener('editMode:save', handleGlobalSave)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sectionKey, pageSlug])

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
          Untertitel (HTML erlaubt)
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.subtitle || ''}
          onEditorChange={(text: string) => setData({ ...data, subtitle: text })}
          init={getTinyMCEConfig(150)}
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
          Hintergrundbild
        </label>
        
        {/* Upload Component */}
        <div className="mb-4">
          <ImageUpload
            onUploadComplete={(url, path) => {
              setData({ ...data, backgroundImage: url })
            }}
            onUploadError={(error) => {
              console.error('Upload error:', error)
              alert(`Upload fehlgeschlagen: ${error}`)
            }}
            folder="pictures"
            maxSize={10}
            buttonText="Bild hochladen"
          />
        </div>

        {/* URL Input als Alternative */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Oder URL eingeben:
          </label>
          <input
            type="text"
            value={data.backgroundImage || ''}
            onChange={(e) => setData({ ...data, backgroundImage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            placeholder="https://..."
          />
        </div>

        {/* Preview */}
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
        <p className="mt-2 text-xs text-gray-500">
          Wird als Fallback verwendet, wenn kein Video gesetzt ist.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hintergrundvideo URL (MP4)
        </label>
        <input
          type="text"
          value={data.backgroundVideo || ''}
          onChange={(e) => setData({ ...data, backgroundVideo: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="https://...video.mp4"
        />
        {data.backgroundVideo && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
            <video
              src={data.backgroundVideo}
              className="w-full h-48 object-cover"
              muted
              loop
              playsInline
              controls
            />
          </div>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Video hat Vorrang vor Hintergrundbild. Falls gesetzt, wird das Video verwendet.
        </p>
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

