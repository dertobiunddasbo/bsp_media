import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { video_url, video_type, title, order_index } = body

    console.log(`[POST /api/admin/cases/${params.id}/videos] Adding video:`, { video_url, video_type, title, order_index })

    const { data, error } = await supabaseAdmin
      .from('case_videos')
      .insert({
        case_id: params.id,
        video_url,
        video_type: video_type || 'vimeo',
        title,
        order_index: order_index || 0,
      })
      .select()
      .single()

    if (error) {
      console.error(`[POST /api/admin/cases/${params.id}/videos] Error:`, error)
      throw error
    }

    console.log(`[POST /api/admin/cases/${params.id}/videos] Success:`, data)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error(`[POST /api/admin/cases/${params.id}/videos] Error:`, error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json({ error: 'videoId required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('case_videos')
      .delete()
      .eq('id', videoId)
      .eq('case_id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
















