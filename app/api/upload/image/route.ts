import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Increase body size limit for file uploads (max 10MB)
export const maxDuration = 30
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 4MB to avoid Vercel/Next.js body size limits)
    // Vercel has a 4.5MB limit for request bodies on Hobby plan
    const maxSize = 4 * 1024 * 1024 // 4MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          success: false,
          error: `Datei ist zu groß. Maximum: 4MB. Ihre Datei: ${(file.size / 1024 / 1024).toFixed(2)}MB. Bitte komprimieren Sie das Bild oder verwenden Sie eine kleinere Datei.` 
        },
        { status: 400 }
      )
    }

    // Get folder from form data or use default
    const folder = (formData.get('folder') as string) || 'pictures'

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
      .from('public_assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false, // Don't overwrite existing files
      })

    if (error) {
      console.error('Supabase storage error:', error)
      // Check if bucket exists
      if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Storage Bucket "public_assets" existiert nicht. Bitte erstelle den Bucket in Supabase Storage.' 
          },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { 
          success: false,
          error: `Upload fehlgeschlagen: ${error.message || 'Unbekannter Fehler'}` 
        },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('public_assets')
      .getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      path: filePath,
      url: urlData.publicUrl,
      fileName: fileName,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Handle 413 errors specifically
    if (error.message?.includes('413') || error.message?.includes('Content Too Large')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Datei ist zu groß für den Upload. Bitte verwenden Sie eine Datei unter 4MB oder komprimieren Sie das Bild.' 
        },
        { status: 413 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Upload fehlgeschlagen' 
      },
      { status: 500 }
    )
  }
}
