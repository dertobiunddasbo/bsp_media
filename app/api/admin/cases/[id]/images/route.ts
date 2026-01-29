import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { image_url, order_index } = body

    console.log(`[POST /api/admin/cases/${params.id}/images] Adding image:`, { image_url, order_index })

    const { data, error } = await supabaseAdmin
      .from('case_images')
      .insert({
        case_id: params.id,
        image_url,
        order_index: order_index || 0,
      })
      .select()
      .single()

    if (error) {
      console.error(`[POST /api/admin/cases/${params.id}/images] Error:`, error)
      throw error
    }

    console.log(`[POST /api/admin/cases/${params.id}/images] Success:`, data)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error(`[POST /api/admin/cases/${params.id}/images] Error:`, error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/** PATCH: Update order of images. Body: { order: string[] } – array of image ids in desired order */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { order } = body as { order: string[] }

    if (!order || !Array.isArray(order) || order.length === 0) {
      return NextResponse.json({ error: 'order array required' }, { status: 400 })
    }

    for (let i = 0; i < order.length; i++) {
      const { error } = await supabaseAdmin
        .from('case_images')
        .update({ order_index: i })
        .eq('id', order[i])
        .eq('case_id', params.id)

      if (error) {
        console.error(`[PATCH /api/admin/cases/${params.id}/images] Error updating order:`, error)
        throw error
      }
    }

    const { data } = await supabaseAdmin
      .from('case_images')
      .select()
      .eq('case_id', params.id)
      .order('order_index', { ascending: true })

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error(`[PATCH /api/admin/cases/${params.id}/images] Error:`, error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json({ error: 'imageId required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('case_images')
      .delete()
      .eq('id', imageId)
      .eq('case_id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
















