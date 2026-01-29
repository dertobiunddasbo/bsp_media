'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ImageUpload from '@/components/ImageUpload'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

const IMAGE_PREFIX = 'case-image-'
const VIDEO_PREFIX = 'case-video-'

function getYouTubeId(url: string): string | null {
  if (!url) return null
  // Shared/Short link: https://youtu.be/DO5OqyTiK90?si=j9jbfFIe4nPx8IBu – ID vor ? nehmen
  const youtuBeMatch = url.match(/youtu\.be\/([^&\n?#]+)/)
  if (youtuBeMatch) return youtuBeMatch[1].split('?')[0].trim()
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/)
  if (match) return match[1]
  try {
    const v = new URL(url).searchParams.get('v')
    if (v) return v
  } catch {}
  const m3 = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  return m3 ? m3[1] : null
}

function getVimeoId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
  return match ? match[1] : null
}

function getVideoThumbnailUrl(video: CaseVideo): string | null {
  if (video.video_type === 'youtube') {
    const id = getYouTubeId(video.video_url)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
  }
  if (video.video_type === 'vimeo') {
    const id = getVimeoId(video.video_url)
    return id ? `https://vumbnail.com/${id}.jpg` : null
  }
  return null
}

function SortableImageItem({
  img,
  onDelete,
}: {
  img: CaseImage
  onDelete: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: IMAGE_PREFIX + img.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-lg shadow flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-600"
        aria-label="Reihenfolge ändern"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>
      <img
        src={img.image_url}
        alt=""
        className="w-full h-32 object-cover rounded-lg border border-gray-200"
      />
      <button
        type="button"
        onClick={() => onDelete(img.id)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
      >
        ×
      </button>
    </div>
  )
}

function SortableVideoItem({
  video,
  onUpdate,
  onDelete,
}: {
  video: CaseVideo
  onUpdate: (id: string, updates: { title?: string; video_url?: string; video_type?: string }) => Promise<void>
  onDelete: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: VIDEO_PREFIX + video.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const thumbnailUrl = getVideoThumbnailUrl(video)

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value !== (video.title || '')) onUpdate(video.id, { title: value })
  }

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value !== (video.video_url || '')) {
      const videoType = value.includes('vimeo') ? 'vimeo' : (value.includes('youtube') || value.includes('youtu.be')) ? 'youtube' : 'direct'
      onUpdate(video.id, { video_url: value, video_type: videoType })
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
    >
      <div className="flex items-center gap-2 shrink-0">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1 shrink-0"
          aria-label="Reihenfolge ändern"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
        <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const parent = (e.target as HTMLImageElement).parentElement
                const fallback = parent?.querySelector('.video-thumb-fallback')
                if (fallback) (fallback as HTMLElement).classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={`video-thumb-fallback flex items-center justify-center w-full h-full bg-gray-300 ${thumbnailUrl ? 'hidden absolute inset-0' : ''}`}>
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-0.5">Titel</label>
          <input
            type="text"
            defaultValue={video.title || ''}
            onBlur={handleTitleBlur}
            placeholder="Video-Titel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-0.5">Video-Link (URL)</label>
          <input
            type="url"
            defaultValue={video.video_url || ''}
            onBlur={handleUrlBlur}
            placeholder="https://www.youtube.com/... oder https://vimeo.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <div className="text-xs text-gray-500">{video.video_type}</div>
      </div>
      <button
        type="button"
        onClick={() => onDelete(video.id)}
        className="shrink-0 self-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
      >
        Löschen
      </button>
    </div>
  )
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const sortedImages = [...images].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
  const sortedVideos = [...videos].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))

  const handleImagesDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const activeStr = String(active.id)
    const overStr = String(over.id)
    if (!activeStr.startsWith(IMAGE_PREFIX) || !overStr.startsWith(IMAGE_PREFIX)) return
    const oldIndex = sortedImages.findIndex((img) => IMAGE_PREFIX + img.id === activeStr)
    const newIndex = sortedImages.findIndex((img) => IMAGE_PREFIX + img.id === overStr)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(sortedImages, oldIndex, newIndex).map((img, i) => ({ ...img, order_index: i }))
    setImages(reordered)
    try {
      const res = await fetch(`/api/admin/cases/${initialData!.id}/images`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: reordered.map((i) => i.id) }),
      })
      if (!res.ok) await fetchCaseDetails()
    } catch {
      await fetchCaseDetails()
    }
  }

  const handleVideosDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const activeStr = String(active.id)
    const overStr = String(over.id)
    if (!activeStr.startsWith(VIDEO_PREFIX) || !overStr.startsWith(VIDEO_PREFIX)) return
    const oldIndex = sortedVideos.findIndex((v) => VIDEO_PREFIX + v.id === activeStr)
    const newIndex = sortedVideos.findIndex((v) => VIDEO_PREFIX + v.id === overStr)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(sortedVideos, oldIndex, newIndex).map((v, i) => ({ ...v, order_index: i }))
    setVideos(reordered)
    try {
      const res = await fetch(`/api/admin/cases/${initialData!.id}/videos`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: reordered.map((v) => v.id) }),
      })
      if (!res.ok) await fetchCaseDetails()
    } catch {
      await fetchCaseDetails()
    }
  }

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
            <p className="text-sm text-gray-500 mb-3">Bilder per Drag &amp; Drop in die gewünschte Reihenfolge ziehen.</p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleImagesDragEnd}
            >
              <SortableContext
                items={sortedImages.map((img) => IMAGE_PREFIX + img.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sortedImages.map((img) => (
                    <SortableImageItem
                      key={img.id}
                      img={img}
                      onDelete={async (id) => {
                        if (!confirm('Bild wirklich löschen?')) return
                        try {
                          const res = await fetch(`/api/admin/cases/${initialData.id}/images?imageId=${id}`, {
                            method: 'DELETE',
                          })
                          if (res.ok) {
                            await new Promise(resolve => setTimeout(resolve, 200))
                            await fetchCaseDetails()
                          } else {
                            const errorData = await res.json().catch(() => ({}))
                            alert(`Fehler beim Löschen: ${errorData.error || 'Unbekannter Fehler'}`)
                          }
                        } catch (error) {
                          alert(`Fehler beim Löschen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                        }
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Videos</h3>
              <button
                type="button"
                onClick={async () => {
                  const url = prompt('Video-URL eingeben:')
                  if (!url) return
                  const videoType = url.includes('vimeo') ? 'vimeo' : (url.includes('youtube') || url.includes('youtu.be')) ? 'youtube' : 'direct'
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
            <p className="text-sm text-gray-500 mb-3">Videos per Drag &amp; Drop in die gewünschte Reihenfolge ziehen.</p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleVideosDragEnd}
            >
              <SortableContext
                items={sortedVideos.map((v) => VIDEO_PREFIX + v.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {sortedVideos.map((video) => (
                    <SortableVideoItem
                      key={video.id}
                      video={video}
                      onUpdate={async (videoId, updates) => {
                        try {
                          const res = await fetch(`/api/admin/cases/${initialData.id}/videos/${videoId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updates),
                          })
                          if (res.ok) {
                            const data = await res.json()
                            setVideos((prev) => prev.map((v) => (v.id === videoId ? { ...v, ...data } : v)))
                          } else {
                            const err = await res.json().catch(() => ({}))
                            alert(err.error || 'Fehler beim Speichern')
                          }
                        } catch (e) {
                          alert('Fehler beim Speichern des Videos')
                        }
                      }}
                      onDelete={async (id) => {
                        if (!confirm('Video wirklich löschen?')) return
                        try {
                          const res = await fetch(`/api/admin/cases/${initialData.id}/videos?videoId=${id}`, {
                            method: 'DELETE',
                          })
                          if (res.ok) {
                            await new Promise(resolve => setTimeout(resolve, 200))
                            await fetchCaseDetails()
                          } else {
                            const errorData = await res.json().catch(() => ({}))
                            alert(`Fehler beim Löschen: ${errorData.error || 'Unbekannter Fehler'}`)
                          }
                        } catch (error) {
                          alert(`Fehler beim Löschen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`)
                        }
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
