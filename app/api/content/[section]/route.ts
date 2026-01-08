import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> | { section: string } }
) {
  try {
    // Handle both sync and async params (Next.js 15 compatibility)
    const resolvedParams = await Promise.resolve(params)
    const section = resolvedParams.section
    
    const { data, error } = await supabaseAdmin
      .from('page_content')
      .select('content')
      .eq('page_section', section)
      .single()

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
      console.error(`Supabase error for section ${section}:`, error)
      throw error
    }

    return NextResponse.json(data?.content || null, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: any) {
    const resolvedParams = await Promise.resolve(params)
    const section = resolvedParams.section
    console.error(`Error in /api/content/${section}:`, error)
    const errorMessage = error?.message || 'Unknown error'
    const errorCode = error?.code || 'UNKNOWN'
    return NextResponse.json(
      { 
        error: errorMessage,
        code: errorCode,
        section: section
      }, 
      { status: 500 }
    )
  }
}

