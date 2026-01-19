'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  onUploadComplete?: (url: string, path: string) => void
  onUploadError?: (error: string) => void
  folder?: string
  maxSize?: number // in MB
  className?: string
  buttonText?: string
  accept?: string
}

export default function ImageUpload({
  onUploadComplete,
  onUploadError,
  folder = 'pictures',
  maxSize = 10,
  className = '',
  buttonText = 'Bild hochladen',
  accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = accept.split(',').map(t => t.trim())
    if (!validTypes.includes(file.type)) {
      const errorMsg = 'Ungültiger Dateityp. Nur Bilder sind erlaubt.'
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      const errorMsg = `Datei ist zu groß. Maximum: ${maxSize}MB`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (folder) {
        formData.append('folder', folder)
      }

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload fehlgeschlagen')
      }

      onUploadComplete?.(data.url, data.path)
      setError(null)
    } catch (err: any) {
      const errorMsg = err.message || 'Upload fehlgeschlagen'
      setError(errorMsg)
      onUploadError?.(errorMsg)
    } finally {
      setUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {preview ? (
        <div className="space-y-4">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg border border-gray-300 max-h-64"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm">Wird hochgeladen...</div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm disabled:opacity-50"
            >
              Anderes Bild wählen
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm disabled:opacity-50"
            >
              Entfernen
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="text-gray-500">Wird hochgeladen...</span>
          ) : (
            <span className="text-gray-600">{buttonText}</span>
          )}
        </button>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {!error && !preview && (
        <p className="mt-2 text-xs text-gray-500">
          Max. {maxSize}MB • JPEG, PNG, GIF, WebP
        </p>
      )}
    </div>
  )
}
