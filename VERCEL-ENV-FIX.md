# Vercel Environment Variables Problem

## Problem:
Die Variablen sind in Vercel konfiguriert, aber der Fehler tritt trotzdem auf.

## Ursache:
`NEXT_PUBLIC_*` Variablen werden zur **Build-Zeit** eingebunden, nicht zur Laufzeit!

Wenn die Variablen nach dem Build hinzugefügt wurden, muss ein **neuer Build** erstellt werden.

## Lösung:

### Option 1: Neuen Deployment triggern (empfohlen)
1. Gehe zu Vercel Dashboard
2. Wähle dein Projekt
3. Klicke auf "Redeploy" (oder push einen neuen Commit)
4. Während des Builds werden die Environment-Variablen eingebunden

### Option 2: Environment-Variablen in Vercel prüfen
1. Gehe zu Vercel Dashboard → Dein Projekt → Settings → Environment Variables
2. Prüfe, ob folgende Variablen vorhanden sind:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (nur für Server-Side)
3. Stelle sicher, dass sie für die richtigen Environments gesetzt sind:
   - Production
   - Preview
   - Development

### Option 3: Code anpassen (Fallback)
Falls die Variablen wirklich nicht verfügbar sein sollen, könnte man einen Fallback einbauen, aber das ist nicht empfohlen für Production.

## Wichtig:
- `NEXT_PUBLIC_*` Variablen sind **öffentlich** (werden im Client-Bundle eingebunden)
- Änderungen an diesen Variablen erfordern **immer einen neuen Build**
- Nach Änderung in Vercel: Neues Deployment nötig!

