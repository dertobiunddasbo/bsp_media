import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[GET /api/admin/cases/${params.id}] Fetching case details`)
    
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select(`
        *,
        case_images (*),
        case_videos (*)
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      console.error(`[GET /api/admin/cases/${params.id}] Error:`, error)
      throw error
    }

    console.log(`[GET /api/admin/cases/${params.id}] Success, images: ${data.case_images?.length || 0}, videos: ${data.case_videos?.length || 0}`)

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: any) {
    console.error(`[GET /api/admin/cases/${params.id}] Error:`, error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, category, slug, client, image_url } = body

    const { data, error } = await supabaseAdmin
      .from('cases')
      .update({
        title,
        description,
        category,
        slug,
        client,
        image_url,
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('cases')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
















