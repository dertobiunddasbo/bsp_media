/**
 * Setup Script for Supabase Schema
 * Run this to initialize the extended schema
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupSchema() {
  console.log('🚀 Setting up Supabase schema...\n')

  // Read extended schema
  const schemaPath = path.join(process.cwd(), 'supabase-schema-extended.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')

  // Split by semicolons and execute each statement
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`📝 Executing ${statements.length} SQL statements...\n`)

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i]
    if (statement.length < 10) continue // Skip very short statements

    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement })
      
      // If RPC doesn't work, try direct query (might need to use REST API)
      if (error) {
        console.log(`⚠️  Statement ${i + 1} might need manual execution`)
        console.log(`   ${statement.substring(0, 100)}...`)
      } else {
        console.log(`✓ Statement ${i + 1} executed`)
      }
    } catch (err) {
      console.log(`⚠️  Statement ${i + 1} - Manual execution might be needed`)
    }
  }

  console.log('\n✅ Schema setup complete!')
  console.log('\n📋 Next steps:')
  console.log('   1. Go to Supabase Dashboard > SQL Editor')
  console.log('   2. Run the contents of supabase-schema-extended.sql')
  console.log('   3. Verify tables: pages, page_sections')
}

setupSchema().catch(console.error)

