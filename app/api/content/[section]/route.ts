import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('page_content')
      .select('content')
      .eq('page_section', params.section)
      .single()

    if (error) {
      // Return null if section doesn't exist (not an error)
      if (error.code === 'PGRST116') {
        return NextResponse.json(null)
      }
      throw error
    }

    return NextResponse.json(data?.content || null)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

