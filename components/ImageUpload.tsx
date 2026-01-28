'use client'

import { useState, useRef } from 'react'

/**
 * Compress image using Canvas API
 * @param file Original image file
 * @param maxWidth Maximum width in pixels (default: 1920)
 * @param maxHeight Maximum height in pixels (default: 1920)
 * @param quality JPEG quality 0-1 (default: 0.85)
 * @returns Compressed image as Blob
 */
async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          file.type.includes('png') ? 'image/png' : 'image/jpeg',
          quality
        )
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

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
  maxSize = 4, // Reduced to 4MB to avoid Vercel body size limits
  className = '',
  buttonText = 'Bild hochladen',
  accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [compressing, setCompressing] = useState(false)
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
    
    // Process and upload file
    processAndUploadFile(file, file.size > maxSizeBytes)
  }

  const processAndUploadFile = async (file: File, needsCompression: boolean) => {
    setCompressing(needsCompression)
    setError(null)

    const maxSizeBytes = maxSize * 1024 * 1024

    try {
      let fileToUpload: File | Blob = file

      // Compress if file is too large
      if (needsCompression) {
        try {
          const compressedBlob = await compressImage(file, 1920, 1920, 0.85)
          
          // Check if compression helped
          if (compressedBlob.size < maxSizeBytes) {
            fileToUpload = new File([compressedBlob], file.name, {
              type: compressedBlob.type,
              lastModified: Date.now(),
            })
            console.log(`Bild komprimiert: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`)
          } else {
            // Still too large, try more aggressive compression
            const moreCompressed = await compressImage(file, 1600, 1600, 0.75)
            fileToUpload = new File([moreCompressed], file.name, {
              type: moreCompressed.type,
              lastModified: Date.now(),
            })
            console.log(`Bild stark komprimiert: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`)
          }
        } catch (compressionError) {
          console.error('Compression error:', compressionError)
          // Continue with original file if compression fails
        }
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(fileToUpload as File)

      // Upload file
      await uploadFile(fileToUpload as File)
    } catch (error) {
      console.error('Error processing file:', error)
      setError('Fehler beim Verarbeiten des Bildes')
      onUploadError?.('Fehler beim Verarbeiten des Bildes')
    } finally {
      setCompressing(false)
    }
  }

  const uploadFile = async (file: File | Blob) => {
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

      // Handle 413 errors specifically
      if (response.status === 413) {
        throw new Error('Datei ist zu groß. Bitte verwenden Sie eine Datei unter 4MB oder komprimieren Sie das Bild.')
      }

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server-Fehler: ${response.status} ${response.statusText}. ${text.substring(0, 100)}`)
      }

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload fehlgeschlagen')
      }

      onUploadComplete?.(data.url, data.path)
      setError(null)
    } catch (err: any) {
      // Handle JSON parse errors specifically
      if (err instanceof SyntaxError) {
        const errorMsg = 'Server-Antwort konnte nicht gelesen werden. Bitte prüfe die Supabase Storage-Konfiguration.'
        setError(errorMsg)
        onUploadError?.(errorMsg)
        console.error('JSON Parse Error:', err)
      } else {
        const errorMsg = err.message || 'Upload fehlgeschlagen'
        setError(errorMsg)
        onUploadError?.(errorMsg)
      }
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
            {(uploading || compressing) && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm text-center">
                  {compressing ? 'Bild wird komprimiert...' : 'Wird hochgeladen...'}
                </div>
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
          {uploading || compressing ? (
            <span className="text-gray-500">
              {compressing ? 'Bild wird komprimiert...' : 'Wird hochgeladen...'}
            </span>
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
          <br />
          <span className="text-gray-400">Große Bilder werden automatisch komprimiert</span>
        </p>
      )}
    </div>
  )
}
