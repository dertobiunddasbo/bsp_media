import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> | { section: string } }
) {
  let section = 'unknown'
  
  try {
    // Handle both sync and async params (Next.js 15 compatibility)
    const resolvedParams = await Promise.resolve(params)
    section = resolvedParams.section

    // Validate section parameter
    if (!section || typeof section !== 'string') {
      return NextResponse.json(
        { error: 'Invalid section parameter' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables', {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      })
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          details: process.env.NODE_ENV === 'development' ? 'Missing Supabase credentials' : undefined
        },
        { status: 500 }
      )
    }

    // Try to query Supabase
    let data, error
    try {
      const result = await supabaseAdmin
        .from('page_content')
        .select('content')
        .eq('page_section', section)
        .single()
      
      data = result.data
      error = result.error
    } catch (supabaseError) {
      // If Supabase client initialization fails
      const errorMessage = supabaseError instanceof Error ? supabaseError.message : 'Unknown Supabase error'
      console.error(`Supabase client error for section ${section}:`, errorMessage)
      return NextResponse.json(
        {
          error: 'Database connection error',
          section: section,
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      )
    }

    if (error) {
      // Return null if section doesn't exist (not an error)
      if (error.code === 'PGRST116') {
        return NextResponse.json(null, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
      }
      
      // Log the full error for debugging
      console.error(`Supabase error for section ${section}:`, {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Return a more informative error response
      return NextResponse.json(
        {
          error: 'Database error',
          code: error.code || 'UNKNOWN',
          section: section,
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    // Debug: Log the content to help identify issues
    console.log(`[API /api/content/${section}] Returning content:`, {
      hasContent: !!data?.content,
      backgroundVideo: (data?.content as any)?.backgroundVideo,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(data?.content || null, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorCode = error && typeof error === 'object' && 'code' in error ? String(error.code) : 'UNKNOWN'
    
    console.error(`Error in /api/content/${section}:`, {
      message: errorMessage,
      code: errorCode,
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: errorCode,
        section: section,
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 
      { status: 500 }
    )
  }
}

