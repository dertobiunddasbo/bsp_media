'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getTinyMCEConfig } from '@/lib/tinymce-config'
import { TestimonialData } from '@/lib/types'

interface TestimonialsEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: TestimonialData
  onSave: (data: TestimonialData) => Promise<void>
}

export default function TestimonialsEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: TestimonialsEditorProps) {
  const [data, setData] = useState<TestimonialData>(initialData || { testimonials: [] })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData || { testimonials: [] })
  }, [initialData])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('Error saving testimonials:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    const newTestimonials = [...(data.testimonials || [])]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setData({ ...data, testimonials: newTestimonials })
  }

  const addItem = () => {
    setData({
      ...data,
      testimonials: [
        ...(data.testimonials || []),
        { name: '', position: '', company: '', quote: '', rating: 5 },
      ],
    })
  }

  const removeItem = (index: number) => {
    const newTestimonials = [...(data.testimonials || [])]
    newTestimonials.splice(index, 1)
    setData({ ...data, testimonials: newTestimonials })
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
            Testimonials
          </label>
          <button
            onClick={addItem}
            className="px-3 py-1 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90"
          >
            + Hinzufügen
          </button>
        </div>
        <div className="space-y-4">
          {(data.testimonials || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Testimonial {index + 1}
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
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => updateItem(index, 'position', e.target.value)}
                  placeholder="Position"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(index, 'company', e.target.value)}
                  placeholder="Unternehmen"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Zitat (HTML erlaubt)
                  </label>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
                    value={item.quote}
                    onEditorChange={(text: string) => updateItem(index, 'quote', text)}
                    init={getTinyMCEConfig(150)}
                  />
                </div>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={item.rating || 5}
                  onChange={(e) => updateItem(index, 'rating', parseInt(e.target.value))}
                  placeholder="Rating (1-5)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
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
