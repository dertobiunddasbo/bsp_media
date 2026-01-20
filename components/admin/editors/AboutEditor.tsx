'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { AboutData } from '@/lib/types'

interface AboutEditorProps {
  sectionKey: string
  pageSlug: string
  initialData?: AboutData
  onSave: (data: AboutData) => Promise<void>
}

export default function AboutEditor({
  sectionKey,
  pageSlug,
  initialData,
  onSave,
}: AboutEditorProps) {
  const [data, setData] = useState<AboutData>(initialData || {})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setData(initialData || {})
  }, [initialData])

  const handleSave = async () => {
    setSaving(true)
    try {
      console.log('[AboutEditor] Saving data:', data)
      await onSave(data)
      console.log('[AboutEditor] Save completed successfully')
      
      // Report save result
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: true }
      }))
      
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('[AboutEditor] Error saving about:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      
      // Report error
      window.dispatchEvent(new CustomEvent('editMode:saveResult', {
        detail: { success: false, error: errorMessage }
      }))
      
      alert(`Fehler beim Speichern: ${errorMessage}`)
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 1
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text1 || ''}
          onEditorChange={(text: string) => setData({ ...data, text1: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 2
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text2 || ''}
          onEditorChange={(text: string) => setData({ ...data, text2: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text 3
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
          value={data.text3 || ''}
          onEditorChange={(text: string) => setData({ ...data, text3: text })}
          init={{
            height: 200,
            menubar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code'],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          }}
        />
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

