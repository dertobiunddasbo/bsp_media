'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'

interface CaseData {
  id?: string
  title: string
  description: string
  category: string
  slug: string
  client: string
  image_url: string
  case_images: Array<{ id: string; image_url: string; order_index: number }>
  case_videos: Array<{ id: string; video_url: string; video_type: string; title: string; order_index: number }>
}

export default function CaseEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [caseData, setCaseData] = useState<CaseData>({
    title: '',
    description: '',
    category: 'Corporate',
    slug: '',
    client: '',
    image_url: '',
    case_images: [],
    case_videos: [],
  })

  useEffect(() => {
    if (!isNew) {
      fetchCase()
    }
  }, [params.id])

  const fetchCase = async () => {
    try {
      const res = await fetch(`/api/admin/cases/${params.id}`)
      const data = await res.json()
      setCaseData(data)
    } catch (error) {
      console.error('Error fetching case:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = isNew ? '/api/admin/cases' : `/api/admin/cases/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: caseData.title,
          description: caseData.description,
          category: caseData.category,
          slug: caseData.slug,
          client: caseData.client,
          image_url: caseData.image_url,
        }),
      })

      const savedCase = await res.json()

      if (isNew) {
        router.push(`/admin/cases/${savedCase.id}`)
      } else {
        alert('Gespeichert!')
      }
    } catch (error) {
      console.error('Error saving case:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const addImage = async () => {
    const url = prompt('Bild-URL eingeben:')
    if (!url) return

    try {
      const res = await fetch(`/api/admin/cases/${params.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: url,
          order_index: caseData.case_images.length,
        }),
      })

      if (res.ok) {
        fetchCase()
      }
    } catch (error) {
      console.error('Error adding image:', error)
    }
  }

  const deleteImage = async (imageId: string) => {
    if (!confirm('Bild löschen?')) return

    try {
      const res = await fetch(`/api/admin/cases/${params.id}/images?imageId=${imageId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchCase()
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const addVideo = async () => {
    const url = prompt('Video-URL eingeben:')
    if (!url) return

    const videoType = url.includes('vimeo') ? 'vimeo' : url.includes('youtube') ? 'youtube' : 'direct'
    const title = prompt('Video-Titel (optional):') || ''

    try {
      const res = await fetch(`/api/admin/cases/${params.id}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: url,
          video_type: videoType,
          title,
          order_index: caseData.case_videos.length,
        }),
      })

      if (res.ok) {
        fetchCase()
      }
    } catch (error) {
      console.error('Error adding video:', error)
    }
  }

  const deleteVideo = async (videoId: string) => {
    if (!confirm('Video löschen?')) return

    try {
      const res = await fetch(`/api/admin/cases/${params.id}/videos?videoId=${videoId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchCase()
      }
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-dark">
          {isNew ? 'Neuer Case' : 'Case bearbeiten'}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/admin/cases')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={caseData.title}
              onChange={(e) => setCaseData({ ...caseData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategorie</label>
            <select
              value={caseData.category}
              onChange={(e) => setCaseData({ ...caseData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="Corporate">Corporate</option>
              <option value="Employer Branding">Employer Branding</option>
              <option value="Event/Kongressfilm">Event/Kongressfilm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={caseData.slug}
              onChange={(e) => setCaseData({ ...caseData, slug: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="aldi-sued-supplier-portraits"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
            <input
              type="text"
              value={caseData.client}
              onChange={(e) => setCaseData({ ...caseData, client: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hauptbild URL</label>
            <input
              type="text"
              value={caseData.image_url}
              onChange={(e) => setCaseData({ ...caseData, image_url: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Beschreibung</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
            value={caseData.description}
            onEditorChange={(content) => setCaseData({ ...caseData, description: content })}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        {!isNew && (
          <>
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-dark">Bilder</h2>
                <button
                  onClick={addImage}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  + Bild hinzufügen
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {caseData.case_images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.image_url}
                      alt=""
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-dark">Videos</h2>
                <button
                  onClick={addVideo}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  + Video hinzufügen
                </button>
              </div>
              <div className="space-y-3">
                {caseData.case_videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{video.title || video.video_url}</div>
                      <div className="text-sm text-gray-500">{video.video_type}</div>
                    </div>
                    <button
                      onClick={() => deleteVideo(video.id)}
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
      </div>
    </div>
  )
}

