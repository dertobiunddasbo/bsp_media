import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const limitNum = limit ? parseInt(limit, 10) : undefined

    let query = supabaseAdmin
      .from('cases')
      .select('id, title, description, category, slug, client, image_url')
      .order('created_at', { ascending: false })

    if (limitNum) {
      query = query.limit(limitNum)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error in /api/cases:', error)
      throw error
    }

    // Transform to match frontend format
    const cases = data?.map((caseItem) => ({
      id: caseItem.slug || caseItem.id,
      title: caseItem.title,
      category: caseItem.category,
      description: caseItem.description,
      image: caseItem.image_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: caseItem.client,
    })) || []

    return NextResponse.json(cases, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: any) {
    console.error('Error in /api/cases:', error)
    const errorMessage = error?.message || 'Unknown error'
    const errorCode = error?.code || 'UNKNOWN'
    return NextResponse.json(
      { 
        error: errorMessage,
        code: errorCode
      }, 
      { status: 500 }
    )
  }
}

