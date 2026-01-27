import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select('id, title, description, category, slug, client, image_url, sort_order')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error in /api/cases/all:', error)
      throw error
    }

    // Transform to match frontend format
    const cases = data?.map((caseItem) => ({
      id: caseItem.id, // Use actual database ID
      title: caseItem.title,
      category: caseItem.category,
      description: caseItem.description,
      image: caseItem.image_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: caseItem.client,
      slug: caseItem.slug,
      sort_order: caseItem.sort_order || 0,
    })) || []

    return NextResponse.json(cases, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: any) {
    console.error('Error in /api/cases/all:', error)
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
