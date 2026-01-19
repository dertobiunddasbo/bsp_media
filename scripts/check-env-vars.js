#!/usr/bin/env node

/**
 * Script zum Prüfen der Environment Variables
 * Hilft beim Debugging von Unterschieden zwischen lokaler und Vercel-Version
 */

// Lade .env.local falls vorhanden
try {
  const fs = require('fs')
  const path = require('path')
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
    console.log('📁 .env.local geladen\n')
  }
} catch (error) {
  // Ignoriere Fehler beim Laden
}

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
]

const optionalVars = [
  'NEXT_PUBLIC_TINYMCE_API_KEY',
  'RECAPTCHA_SECRET_KEY',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'CONTACT_EMAIL',
  'NEXT_PUBLIC_SITE_URL',
]

console.log('🔍 Environment Variables Check\n')
console.log('=' .repeat(60))

// Prüfe erforderliche Variablen
console.log('\n✅ ERFORDERLICHE VARIABLEN:')
let allRequiredPresent = true
requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    // Zeige nur die ersten und letzten 4 Zeichen
    const masked = value.length > 8 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : '***'
    console.log(`  ✅ ${varName}: ${masked}`)
  } else {
    console.log(`  ❌ ${varName}: FEHLT!`)
    allRequiredPresent = false
  }
})

// Prüfe optionale Variablen
console.log('\n📋 OPTIONALE VARIABLEN:')
optionalVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    const masked = value.length > 8 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : '***'
    console.log(`  ✅ ${varName}: ${masked}`)
  } else {
    console.log(`  ⚠️  ${varName}: nicht gesetzt`)
  }
})

console.log('\n' + '='.repeat(60))

if (!allRequiredPresent) {
  console.log('\n❌ FEHLER: Einige erforderliche Environment Variables fehlen!')
  console.log('\n📝 Nächste Schritte:')
  console.log('1. Prüfe deine .env.local Datei')
  console.log('2. Stelle sicher, dass alle Variablen auf Vercel gesetzt sind')
  console.log('3. Vercel Dashboard → Settings → Environment Variables')
  process.exit(1)
} else {
  console.log('\n✅ Alle erforderlichen Environment Variables sind gesetzt!')
  console.log('\n⚠️  WICHTIG: Stelle sicher, dass diese auch auf Vercel gesetzt sind!')
  console.log('   Vercel Dashboard → Settings → Environment Variables')
  console.log('   Für NEXT_PUBLIC_* Variablen: Alle Environments (Production, Preview, Development)')
}

console.log('\n' + '='.repeat(60))
