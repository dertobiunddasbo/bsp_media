# Debug: Invalid API Key

## Problem:
"Invalid API key" beim Login

## Lösung:

### 1. Prüfe welcher Key verwendet wird

Der Login verwendet **NEXT_PUBLIC_SUPABASE_ANON_KEY** (anon/public key), NICHT den service_role key!

### 2. In Supabase Dashboard prüfen:

1. Gehe zu: https://supabase.com/dashboard/project/bzsplxyxfouskjqysmen/settings/api
2. Kopiere:
   - **Project URL** → für `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → für `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - NICHT den "service_role" key verwenden!

### 3. In Vercel prüfen:

1. Vercel Dashboard → Projekt → Settings → Environment Variables
2. Prüfe `NEXT_PUBLIC_SUPABASE_ANON_KEY`:
   - Muss der "anon public" Key sein
   - Keine Leerzeichen am Anfang/Ende
   - Kompletter Key kopiert (sehr lang!)
   - Beginnt normalerweise mit: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Neuen Build triggern:

Nach Änderung der Variablen:
- Neues Deployment in Vercel
- Oder: Commit pushen

### 5. Test lokal:

Falls es lokal funktioniert, aber nicht in Vercel:
- Prüfe ob `.env.local` den richtigen Key hat
- Lokal: `npm run dev` → Login testen
- Wenn lokal funktioniert, ist es ein Vercel-Konfigurationsproblem

