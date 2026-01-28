'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ImageUpload from '@/components/ImageUpload'

const TinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
})

interface CaseFormProps {
  initialData?: any
}

interface CaseImage {
  id: string
  image_url: string
  order_index: number
}

interface CaseVideo {
  id: string
  video_url: string
  video_type: string
  title: string
  order_index: number
}

export default function CaseForm({ initialData }: CaseFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!initialData)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Corporate',
    slug: '',
    client: '',
    image_url: '',
  })
  const [images, setImages] = useState<CaseImage[]>([])
  const [videos, setVideos] = useState<CaseVideo[]>([])

  useEffect(() => {
    if (initialData) {
      // If description doesn't start with <p>, wrap it for TinyMCE
      let description = initialData.description || ''
      if (description && !description.trim().startsWith('<')) {
        description = `<p>${description}</p>`
      }
      
      setFormData({
        title: initialData.title || '',
        description: description,
        category: initialData.category || 'Corporate',
        slug: initialData.slug || '',
        client: initialData.client || '',
        image_url: initialData.image_url || '',
      })
      setImages(initialData.case_images || [])
      setVideos(initialData.case_videos || [])
      setLoading(false)
    }
  }, [initialData])

  const fetchCaseDetails = async () => {
    if (!initialData?.id) return
    try {
      // Add cache-busting to ensure fresh data
      const cacheBuster = `?t=${Date.now()}`
      const res = await fetch(`/api/admin/cases/${initialData.id}${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log('[CaseForm] Fetched case details:', data)
        setImages(data.case_images || [])
        setVideos(data.case_videos || [])
      } else {
        console.error('[CaseForm] Failed to fetch case details:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('[CaseForm] Error fetching case details:', error)
    }
  }

  useEffect(() => {
    if (initialData?.id) {
      fetchCaseDetails()
    }
  }, [initialData?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = initialData ? `/api/admin/cases/${initialData.id}` : '/api/admin/cases'
      const method = initialData ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Fehler beim Speichern')
      }

      const savedCase = await res.json()

      if (!initialData) {
        router.push(`/admin/cases/${savedCase.id}`)
      } else {
        alert('Gespeichert!')
        router.push('/admin/cases')
      }
    } catch (error: any) {
      console.error('Error saving case:', error)
      alert(`Fehler beim Speichern: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titel *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="z.B. ALDI SÜD Supplier Portraits"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategorie *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="Corporate">Corporate</option>
            <option value="Employer Branding">Employer Branding</option>
            <option value="Event/Kongressfilm">Event/Kongressfilm</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="aldi-sued-supplier-portraits"
          />
          <p className="mt-1 text-xs text-gray-500">URL-freundlicher Name (kleinbuchstaben, bindestriche)</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Client
          </label>
          <input
            type="text"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="z.B. ALDI SÜD"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hauptbild *
          </label>
          <div className="mb-3">
            <ImageUpload
              onUploadComplete={(url, path) => {
                setFormData({ ...formData, image_url: url })
              }}
              onUploadError={(error) => {
                console.error('Upload error:', error)
                alert(`Upload fehlgeschlagen: ${error}`)
              }}
              folder="pictures"
              maxSize={10}
              buttonText="Hauptbild hochladen"
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Oder URL eingeben:
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="https://..."
            />
          </div>
          {formData.image_url && (
            <div className="mt-3">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Beschreibung *
        </label>
        <TinyMCEEditor
          value={formData.description}
          onChange={(content: string) => {
            // Remove wrapping <p> tags if content is just a single paragraph
            // TinyMCE automatically wraps content in <p> tags, but we want to store clean content
            let cleanedContent = content.trim()
            
            // Only remove outer <p> tags if the content is a single paragraph
            // Pattern: <p>content</p> (with optional attributes)
            // Use [\s\S] instead of . with s flag for multiline matching
            const singleParagraphMatch = cleanedContent.match(/^<p[^>]*>([\s\S]*?)<\/p>\s*$/)
            if (singleParagraphMatch) {
              // It's a single paragraph, remove the wrapping tags
              cleanedContent = singleParagraphMatch[1].trim()
            }
            // If it's multiple paragraphs or other HTML, keep it as is
            
            setFormData({ ...formData, description: cleanedContent })
          }}
        />
      </div>

      {initialData?.id && (
        <>
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bilder</h3>
              <div className="flex gap-2">
                <ImageUpload
                  onUploadComplete={async (url, path) => {
                    try {
                      console.log('[CaseForm] Image upload complete, URL:', url)
                      const res = await fetch(`/api/admin/cases/${initialData.id}/images`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          image_url: url,
                          order_index: images.length,
                        }),
                      })
                      if (res.ok) {
                        const data = await res.json()
                        console.log('[CaseForm] Image added to case:', data)
                        // Wait a bit to ensure database is updated
                        await new Promise(resolve => setTimeout(resolve, 200))
                        // Reload case details
                        await fetchCaseDetails()
                      } else {
                        const errorData = await res.json().catch(() => ({}))
                        console.error('[CaseForm] Failed to add image:', errorData)
                        throw new Error(errorData.error || 'Fehler beim Hinzufügen des Bildes')
                      }
                    } catch (error) {
                      console.error('[CaseForm] Error adding image:', error)
                      alert(`Fehler beim Hinzufügen des Bildes: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                    }
                  }}
                  onUploadError={(error) => {
                    console.error('[CaseForm] Upload error:', error)
                    alert(`Upload fehlgeschlagen: ${error}`)
                  }}
                  folder="pictures"
                  maxSize={10}
                  buttonText="+ Bild hochladen"
                  className="inline-block"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const url = prompt('Bild-URL eingeben:')
                    if (!url) return
                    try {
                      console.log('[CaseForm] Adding image URL:', url)
                      const res = await fetch(`/api/admin/cases/${initialData.id}/images`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          image_url: url,
                          order_index: images.length,
                        }),
                      })
                      if (res.ok) {
                        const data = await res.json()
                        console.log('[CaseForm] Image URL added to case:', data)
                        // Wait a bit to ensure database is updated
                        await new Promise(resolve => setTimeout(resolve, 200))
                        // Reload case details
                        await fetchCaseDetails()
                      } else {
                        const errorData = await res.json().catch(() => ({}))
                        console.error('[CaseForm] Failed to add image URL:', errorData)
                        alert(`Fehler beim Hinzufügen des Bildes: ${errorData.error || 'Unbekannter Fehler'}`)
                      }
                    } catch (error) {
                      console.error('[CaseForm] Error adding image URL:', error)
                      alert(`Fehler beim Hinzufügen des Bildes: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  + URL hinzufügen
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.image_url}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm('Bild wirklich löschen?')) return
                      try {
                        console.log('[CaseForm] Deleting image:', img.id)
                        const res = await fetch(`/api/admin/cases/${initialData.id}/images?imageId=${img.id}`, {
                          method: 'DELETE',
                        })
                        if (res.ok) {
                          console.log('[CaseForm] Image deleted successfully')
                          // Wait a bit to ensure database is updated
                          await new Promise(resolve => setTimeout(resolve, 200))
                          // Reload case details
                          await fetchCaseDetails()
                        } else {
                          const errorData = await res.json().catch(() => ({}))
                          console.error('[CaseForm] Failed to delete image:', errorData)
                          alert(`Fehler beim Löschen: ${errorData.error || 'Unbekannter Fehler'}`)
                        }
                      } catch (error) {
                        console.error('[CaseForm] Error deleting image:', error)
                        alert(`Fehler beim Löschen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Videos</h3>
              <button
                type="button"
                onClick={async () => {
                  const url = prompt('Video-URL eingeben:')
                  if (!url) return
                  const videoType = url.includes('vimeo') ? 'vimeo' : url.includes('youtube') ? 'youtube' : 'direct'
                  const title = prompt('Video-Titel (optional):') || ''
                  try {
                    console.log('[CaseForm] Adding video URL:', url)
                    const res = await fetch(`/api/admin/cases/${initialData.id}/videos`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        video_url: url,
                        video_type: videoType,
                        title,
                        order_index: videos.length,
                      }),
                    })
                    if (res.ok) {
                      const data = await res.json()
                      console.log('[CaseForm] Video added to case:', data)
                      // Wait a bit to ensure database is updated
                      await new Promise(resolve => setTimeout(resolve, 200))
                      // Reload case details
                      await fetchCaseDetails()
                    } else {
                      const errorData = await res.json().catch(() => ({}))
                      console.error('[CaseForm] Failed to add video:', errorData)
                      alert(`Fehler beim Hinzufügen des Videos: ${errorData.error || 'Unbekannter Fehler'}`)
                    }
                  } catch (error) {
                    console.error('[CaseForm] Error adding video:', error)
                    alert(`Fehler beim Hinzufügen des Videos: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                  }
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                + Video hinzufügen
              </button>
            </div>
            <div className="space-y-3">
              {videos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{video.title || video.video_url}</div>
                    <div className="text-sm text-gray-500">{video.video_type}</div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm('Video wirklich löschen?')) return
                      try {
                        console.log('[CaseForm] Deleting video:', video.id)
                        const res = await fetch(`/api/admin/cases/${initialData.id}/videos?videoId=${video.id}`, {
                          method: 'DELETE',
                        })
                        if (res.ok) {
                          console.log('[CaseForm] Video deleted successfully')
                          // Wait a bit to ensure database is updated
                          await new Promise(resolve => setTimeout(resolve, 200))
                          // Reload case details
                          await fetchCaseDetails()
                        } else {
                          const errorData = await res.json().catch(() => ({}))
                          console.error('[CaseForm] Failed to delete video:', errorData)
                          alert(`Fehler beim Löschen: ${errorData.error || 'Unbekannter Fehler'}`)
                        }
                      } catch (error) {
                        console.error('[CaseForm] Error deleting video:', error)
                        alert(`Fehler beim Löschen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Löschen
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {saving ? 'Speichert...' : 'Speichern'}
        </button>
      </div>
    </form>
  )
}
