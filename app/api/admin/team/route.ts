import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, position, email, phone, image_url, order_index } = body

    // Validation
    if (!name || !position) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .insert({
        name,
        position,
        email: email || null,
        phone: phone || null,
        image_url: image_url || null,
        order_index: order_index || 0,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create team member' },
      { status: 500 }
    )
  }
}
