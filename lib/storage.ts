import { supabaseAdmin } from './supabase-admin'

export interface UploadImageOptions {
  file: File
  folder?: string
  maxSize?: number // in bytes
}

export interface UploadImageResult {
  success: boolean
  path: string
  url: string
  fileName: string
  error?: string
}

/**
 * Uploads an image file to Supabase Storage
 * @param options Upload options
 * @returns Upload result with URL
 */
export async function uploadImage(options: UploadImageOptions): Promise<UploadImageResult> {
  const { file, folder = 'pictures', maxSize = 10 * 1024 * 1024 } = options

  try {
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      return {
        success: false,
        path: '',
        url: '',
        fileName: '',
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
      }
    }

    // Validate file size
    if (file.size > maxSize) {
      return {
        success: false,
        path: '',
        url: '',
        fileName: '',
        error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`,
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`
    const filePath = `${folder}/${fileName}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('public-storage')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Supabase storage error:', error)
      return {
        success: false,
        path: '',
        url: '',
        fileName: '',
        error: `Upload failed: ${error.message}`,
      }
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('public-storage')
      .getPublicUrl(filePath)

    return {
      success: true,
      path: filePath,
      url: urlData.publicUrl,
      fileName: fileName,
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    return {
      success: false,
      path: '',
      url: '',
      fileName: '',
      error: error.message || 'Upload failed',
    }
  }
}

/**
 * Deletes an image from Supabase Storage
 * @param filePath Path to the file in storage (e.g., 'pictures/filename.jpg')
 * @returns Success status
 */
export async function deleteImage(filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin.storage
      .from('public-storage')
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Delete error:', error)
    return {
      success: false,
      error: error.message || 'Delete failed',
    }
  }
}

/**
 * Gets the public URL for an image in storage
 * @param filePath Path to the file in storage
 * @returns Public URL
 */
export function getImageUrl(filePath: string): string {
  const { data } = supabaseAdmin.storage
    .from('public-storage')
    .getPublicUrl(filePath)

  return data.publicUrl
}
