import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id
    const body = await request.json()
    const { name, position, email, phone, image_url, order_index } = body

    // Validation
    if (!name || !position) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      )
    }

    const updateData: any = {
      name,
      position,
      email: email || null,
      phone: phone || null,
      image_url: image_url || null,
    }

    if (order_index !== undefined) {
      updateData.order_index = order_index
    }

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id

    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
