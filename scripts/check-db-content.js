#!/usr/bin/env node

/**
 * Script zum Prüfen der Datenbank-Inhalte direkt
 * Hilft beim Debugging von Unterschieden zwischen lokal und Vercel
 */

const fs = require('fs')
const path = require('path')

// Lade .env.local
try {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        process.env[key] = value
      }
    })
  }
} catch (error) {
  console.error('Fehler beim Laden von .env.local:', error.message)
}

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Fehlende Supabase-Umgebungsvariablen!')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSection(section) {
  console.log(`\n📦 Prüfe Section: ${section}`)
  console.log('-'.repeat(60))
  
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_section', section)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log(`⚠️  Keine Daten für Section '${section}' gefunden`)
        return null
      }
      console.error(`❌ Fehler:`, error)
      return null
    }
    
    if (!data) {
      console.log(`⚠️  Keine Daten gefunden`)
      return null
    }
    
    console.log(`✅ Daten gefunden (ID: ${data.id})`)
    console.log(`   Erstellt: ${data.created_at}`)
    console.log(`   Aktualisiert: ${data.updated_at || 'N/A'}`)
    
    const content = data.content || {}
    console.log(`\n📄 Content-Struktur:`)
    console.log(`   Keys: ${Object.keys(content).join(', ')}`)
    
    // Spezielle Checks für Hero
    if (section === 'hero') {
      console.log(`\n🎬 Hero-spezifische Felder:`)
      console.log(`   backgroundImage: ${content.backgroundImage ? '✅' : '❌'} ${content.backgroundImage ? `(${content.backgroundImage.substring(0, 50)}...)` : ''}`)
      console.log(`   backgroundVideo: ${content.backgroundVideo ? '✅' : '❌'} ${content.backgroundVideo ? `(${content.backgroundVideo.substring(0, 50)}...)` : ''}`)
      console.log(`   title: ${content.title ? '✅' : '❌'}`)
      console.log(`   subtitle: ${content.subtitle ? '✅' : '❌'}`)
      
      if (content.backgroundVideo) {
        console.log(`\n🎥 Video-URL Details:`)
        console.log(`   URL: ${content.backgroundVideo}`)
        console.log(`   Ist Supabase Storage: ${content.backgroundVideo.includes('supabase.co/storage') ? '✅ Ja' : '❌ Nein'}`)
        console.log(`   Ist absolute URL: ${content.backgroundVideo.startsWith('http') ? '✅ Ja' : '❌ Nein'}`)
      }
    }
    
    // Spezielle Checks für Leistungen
    if (section === 'leistungen') {
      console.log(`\n💼 Leistungen-spezifische Felder:`)
      const items = content.items || []
      console.log(`   Anzahl Items: ${items.length}`)
      
      items.forEach((item, index) => {
        console.log(`\n   Item ${index + 1}: ${item.title || 'Ohne Titel'}`)
        console.log(`     image: ${item.image ? '✅' : '❌'}`)
        console.log(`     backgroundVideo: ${item.backgroundVideo ? '✅' : '❌'}`)
        if (item.backgroundVideo) {
          console.log(`       Video-URL: ${item.backgroundVideo.substring(0, 60)}...`)
        }
      })
    }
    
    return content
  } catch (error) {
    console.error(`❌ Fehler beim Abrufen der Daten:`, error.message)
    return null
  }
}

async function main() {
  console.log('🔍 Supabase Datenbank-Inhalte prüfen')
  console.log('='.repeat(60))
  console.log(`Supabase URL: ${supabaseUrl}`)
  console.log(`Service Key: ${supabaseKey.substring(0, 20)}...`)
  
  const sections = ['hero', 'leistungen']
  
  for (const section of sections) {
    await checkSection(section)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('\n💡 Nächste Schritte:')
  console.log('1. Vergleiche diese Daten mit der Vercel-API-Antwort')
  console.log('2. Prüfe, ob Video-URLs öffentlich zugänglich sind')
  console.log('3. Prüfe Browser Console auf Fehler beim Laden')
}

main().catch(console.error)
