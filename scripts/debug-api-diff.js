#!/usr/bin/env node

/**
 * Script zum Vergleichen der API-Antworten zwischen lokal und Vercel
 * Hilft beim Debugging von Unterschieden in den Daten
 */

const fs = require('fs')
const path = require('path')

// Lade .env.local falls vorhanden
try {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
  }
} catch (error) {
  // Ignoriere Fehler
}

const LOCAL_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const VERCEL_URL = process.argv[2] || process.env.VERCEL_URL || ''

if (!VERCEL_URL) {
  console.error('❌ Bitte Vercel-URL als Argument angeben:')
  console.error('   node scripts/debug-api-diff.js https://deine-app.vercel.app')
  process.exit(1)
}

const sections = ['hero', 'leistungen']

async function fetchAPI(url, section) {
  try {
    const response = await fetch(`${url}/api/content/${section}`)
    if (!response.ok) {
      return { error: `HTTP ${response.status}: ${response.statusText}` }
    }
    return await response.json()
  } catch (error) {
    return { error: error.message }
  }
}

function compareObjects(local, vercel, path = '') {
  const differences = []
  
  if (local === null && vercel === null) return differences
  if (local === null) {
    differences.push({ path, local: null, vercel })
    return differences
  }
  if (vercel === null) {
    differences.push({ path, local, vercel: null })
    return differences
  }
  
  if (typeof local !== typeof vercel) {
    differences.push({ path, local: typeof local, vercel: typeof vercel })
    return differences
  }
  
  if (typeof local !== 'object' || local === null) {
    if (local !== vercel) {
      differences.push({ path, local, vercel })
    }
    return differences
  }
  
  if (Array.isArray(local)) {
    if (local.length !== vercel.length) {
      differences.push({ 
        path, 
        local: `Array[${local.length}]`, 
        vercel: `Array[${vercel.length}]` 
      })
    }
    local.forEach((item, index) => {
      differences.push(...compareObjects(item, vercel[index], `${path}[${index}]`))
    })
  } else {
    const allKeys = new Set([...Object.keys(local), ...Object.keys(vercel)])
    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key
      if (!(key in local)) {
        differences.push({ path: newPath, local: 'MISSING', vercel: vercel[key] })
      } else if (!(key in vercel)) {
        differences.push({ path: newPath, local: local[key], vercel: 'MISSING' })
      } else {
        differences.push(...compareObjects(local[key], vercel[key], newPath))
      }
    })
  }
  
  return differences
}

async function main() {
  console.log('🔍 API-Vergleich: Lokal vs. Vercel\n')
  console.log('='.repeat(80))
  console.log(`Lokal:  ${LOCAL_URL}`)
  console.log(`Vercel: ${VERCEL_URL}\n`)
  
  for (const section of sections) {
    console.log(`\n📦 Section: ${section}`)
    console.log('-'.repeat(80))
    
    const [localData, vercelData] = await Promise.all([
      fetchAPI(LOCAL_URL, section),
      fetchAPI(VERCEL_URL, section)
    ])
    
    if (localData.error) {
      console.log(`❌ Lokal: ${localData.error}`)
    } else {
      console.log(`✅ Lokal: Daten geladen`)
    }
    
    if (vercelData.error) {
      console.log(`❌ Vercel: ${vercelData.error}`)
    } else {
      console.log(`✅ Vercel: Daten geladen`)
    }
    
    if (localData.error || vercelData.error) {
      continue
    }
    
    // Spezielle Checks für wichtige Felder
    if (section === 'hero') {
      console.log('\n🎬 Hero-spezifische Checks:')
      console.log(`  backgroundImage (lokal):  ${localData.backgroundImage ? '✅ gesetzt' : '❌ fehlt'}`)
      console.log(`  backgroundImage (vercel): ${vercelData.backgroundImage ? '✅ gesetzt' : '❌ fehlt'}`)
      console.log(`  backgroundVideo (lokal):  ${localData.backgroundVideo ? '✅ gesetzt' : '❌ fehlt'}`)
      console.log(`  backgroundVideo (vercel): ${vercelData.backgroundVideo ? '✅ gesetzt' : '❌ fehlt'}`)
      
      if (localData.backgroundVideo && vercelData.backgroundVideo) {
        if (localData.backgroundVideo !== vercelData.backgroundVideo) {
          console.log(`\n⚠️  Video-URLs unterscheiden sich:`)
          console.log(`  Lokal:  ${localData.backgroundVideo}`)
          console.log(`  Vercel: ${vercelData.backgroundVideo}`)
        } else {
          console.log(`\n✅ Video-URLs sind identisch: ${localData.backgroundVideo}`)
        }
      } else if (localData.backgroundVideo && !vercelData.backgroundVideo) {
        console.log(`\n❌ Video nur lokal vorhanden: ${localData.backgroundVideo}`)
      } else if (!localData.backgroundVideo && vercelData.backgroundVideo) {
        console.log(`\n❌ Video nur auf Vercel vorhanden: ${vercelData.backgroundVideo}`)
      }
    }
    
    if (section === 'leistungen') {
      console.log('\n💼 Leistungen-spezifische Checks:')
      const localItems = localData.items || []
      const vercelItems = vercelData.items || []
      console.log(`  Anzahl Items (lokal):  ${localItems.length}`)
      console.log(`  Anzahl Items (vercel): ${vercelItems.length}`)
      
      if (localItems.length !== vercelItems.length) {
        console.log(`\n⚠️  Unterschiedliche Anzahl von Leistungen!`)
      }
      
      // Prüfe Videos in Items
      const localVideos = localItems.filter(item => item.backgroundVideo).length
      const vercelVideos = vercelItems.filter(item => item.backgroundVideo).length
      console.log(`  Items mit Video (lokal):  ${localVideos}`)
      console.log(`  Items mit Video (vercel): ${vercelVideos}`)
    }
    
    // Detaillierter Vergleich
    const differences = compareObjects(localData, vercelData)
    if (differences.length > 0) {
      console.log(`\n⚠️  ${differences.length} Unterschied(e) gefunden:`)
      differences.slice(0, 10).forEach(diff => {
        console.log(`  ${diff.path}:`)
        console.log(`    Lokal:  ${JSON.stringify(diff.local).substring(0, 100)}`)
        console.log(`    Vercel: ${JSON.stringify(diff.vercel).substring(0, 100)}`)
      })
      if (differences.length > 10) {
        console.log(`  ... und ${differences.length - 10} weitere`)
      }
    } else {
      console.log(`\n✅ Keine Unterschiede gefunden - Daten sind identisch!`)
    }
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('\n💡 Nächste Schritte:')
  console.log('1. Prüfe die Supabase-Datenbank direkt')
  console.log('2. Prüfe, ob Video-URLs öffentlich zugänglich sind (CORS)')
  console.log('3. Prüfe Vercel Build Logs auf Fehler')
  console.log('4. Prüfe Browser Console auf Fehler beim Laden der Videos')
}

main().catch(console.error)
