#!/usr/bin/env node

/**
 * Script zum Testen von Video-URLs
 * Prüft, ob Videos öffentlich zugänglich sind
 */

const https = require('https')
const http = require('http')

function testURL(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http
    
    const request = client.get(url, (response) => {
      const statusCode = response.statusCode
      const contentType = response.headers['content-type']
      const contentLength = response.headers['content-length']
      
      // Abbrechen, wenn Status nicht OK
      if (statusCode !== 200) {
        response.resume()
        resolve({
          url,
          accessible: false,
          statusCode,
          error: `HTTP ${statusCode}`,
          contentType,
        })
        return
      }
      
      // Nur Header lesen, nicht den ganzen Body
      response.on('data', () => {})
      response.on('end', () => {
        resolve({
          url,
          accessible: true,
          statusCode,
          contentType,
          contentLength: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : 'unknown',
        })
      })
    })
    
    request.on('error', (error) => {
      resolve({
        url,
        accessible: false,
        error: error.message,
      })
    })
    
    request.setTimeout(10000, () => {
      request.destroy()
      resolve({
        url,
        accessible: false,
        error: 'Timeout (10s)',
      })
    })
  })
}

async function main() {
  const urls = [
    'https://bzsplxyxfouskjqysmen.supabase.co/storage/v1/object/public/public_assets/videos/header.mp4',
  ]
  
  // Weitere URLs können als Argumente übergeben werden
  if (process.argv.length > 2) {
    urls.push(...process.argv.slice(2))
  }
  
  console.log('🎥 Teste Video-URLs auf Zugänglichkeit\n')
  console.log('='.repeat(80))
  
  for (const url of urls) {
    console.log(`\n📹 Teste: ${url}`)
    console.log('-'.repeat(80))
    
    const result = await testURL(url)
    
    if (result.accessible) {
      console.log(`✅ ZUGÄNGLICH`)
      console.log(`   Status: ${result.statusCode}`)
      console.log(`   Content-Type: ${result.contentType || 'unknown'}`)
      console.log(`   Größe: ${result.contentLength || 'unknown'}`)
    } else {
      console.log(`❌ NICHT ZUGÄNGLICH`)
      console.log(`   Fehler: ${result.error}`)
      if (result.statusCode) {
        console.log(`   Status: ${result.statusCode}`)
      }
      
      // Spezielle Hinweise für häufige Probleme
      if (result.statusCode === 403) {
        console.log(`\n💡 Hinweis: 403 Forbidden - Der Storage-Bucket ist möglicherweise nicht öffentlich!`)
        console.log(`   Lösung: Prüfe Supabase Dashboard → Storage → Bucket Policies`)
      } else if (result.statusCode === 404) {
        console.log(`\n💡 Hinweis: 404 Not Found - Die Datei existiert nicht oder der Pfad ist falsch`)
      } else if (result.statusCode === 401) {
        console.log(`\n💡 Hinweis: 401 Unauthorized - Authentifizierung erforderlich`)
        console.log(`   Lösung: Stelle sicher, dass der Bucket öffentlich ist`)
      }
    }
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('\n💡 Nächste Schritte:')
  console.log('1. Falls 403/401: Prüfe Supabase Storage Bucket Policies')
  console.log('2. Stelle sicher, dass der Bucket "public" ist')
  console.log('3. Prüfe Browser Console auf CORS-Fehler')
}

main().catch(console.error)
