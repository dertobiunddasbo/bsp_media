import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { caseIds } = body

    if (!Array.isArray(caseIds) || caseIds.length === 0) {
      return NextResponse.json(
        { error: 'caseIds muss ein Array sein' },
        { status: 400 }
      )
    }

    // Update sort_order for each case
    const updates = caseIds.map((caseId: string, index: number) => {
      return supabaseAdmin
        .from('cases')
        .update({ sort_order: index + 1 })
        .eq('id', caseId)
    })

    const results = await Promise.all(updates)
    
    // Check for errors
    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      console.error('Errors updating sort order:', errors)
      return NextResponse.json(
        { error: 'Fehler beim Aktualisieren der Sortierung' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in /api/cases/reorder:', error)
    return NextResponse.json(
      { error: error?.message || 'Unbekannter Fehler' },
      { status: 500 }
    )
  }
}
