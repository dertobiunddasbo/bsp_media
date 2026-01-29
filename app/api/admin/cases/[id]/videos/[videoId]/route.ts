import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

/** PUT: Update a single video (title, video_url, video_type) */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; videoId: string } }
) {
  try {
    const body = await request.json()
    const { title, video_url, video_type } = body as {
      title?: string
      video_url?: string
      video_type?: string
    }

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (video_url !== undefined) updateData.video_url = video_url
    if (video_type !== undefined) updateData.video_type = video_type

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('case_videos')
      .update(updateData)
      .eq('id', params.videoId)
      .eq('case_id', params.id)
      .select()
      .single()

    if (error) {
      console.error(`[PUT /api/admin/cases/${params.id}/videos/${params.videoId}] Error:`, error)
      throw error
    }

    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[PUT /api/admin/cases/${params.id}/videos/${params.videoId}] Error:`, error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
