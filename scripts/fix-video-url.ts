/**
 * Script zum Korrigieren der Video-URL in der Datenbank
 * Ersetzt headertest.mp4 mit header.mp4 in der Hero-Section
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Lade Environment Variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Fehlende Environment Variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixVideoUrl() {
  try {
    console.log('🔍 Lade Hero-Section aus der Datenbank...')
    
    // Lade aktuelle Hero-Daten
    const { data: heroData, error: fetchError } = await supabase
      .from('page_content')
      .select('content')
      .eq('page_section', 'hero')
      .single()

    if (fetchError) {
      console.error('❌ Fehler beim Laden der Hero-Section:', fetchError)
      process.exit(1)
    }

    if (!heroData || !heroData.content) {
      console.error('❌ Keine Hero-Daten gefunden')
      process.exit(1)
    }

    const content = heroData.content as any
    const currentVideoUrl = content.backgroundVideo

    console.log('📊 Aktuelle Video-URL:', currentVideoUrl)

    if (!currentVideoUrl) {
      console.log('⚠️ Keine Video-URL gefunden in Hero-Daten')
      process.exit(0)
    }

    // Prüfe, ob headertest.mp4 in der URL ist
    if (currentVideoUrl.includes('headertest.mp4')) {
      console.log('🔧 Korrigiere Video-URL...')
      
      // Ersetze headertest.mp4 mit header.mp4
      const correctedUrl = currentVideoUrl.replace('headertest.mp4', 'header.mp4')
      
      console.log('📝 Neue Video-URL:', correctedUrl)

      // Aktualisiere Datenbank
      const { data: updatedData, error: updateError } = await supabase
        .from('page_content')
        .update({
          content: {
            ...content,
            backgroundVideo: correctedUrl
          }
        })
        .eq('page_section', 'hero')
        .select()
        .single()

      if (updateError) {
        console.error('❌ Fehler beim Aktualisieren:', updateError)
        process.exit(1)
      }

      console.log('✅ Video-URL erfolgreich korrigiert!')
      console.log('📊 Aktualisierte Daten:', JSON.stringify(updatedData, null, 2))
    } else {
      console.log('✅ Video-URL ist bereits korrekt (enthält nicht headertest.mp4)')
    }
  } catch (error) {
    console.error('❌ Unerwarteter Fehler:', error)
    process.exit(1)
  }
}

fixVideoUrl()
