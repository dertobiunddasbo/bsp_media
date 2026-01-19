# Video & Leistungen Debug Guide

## Problem
- Hintergrundvideo wird lokal angezeigt, aber nicht im Vercel Deployment
- Unterschiedliche Leistungsbereiche zwischen lokal und Vercel

## Mögliche Ursachen

### 1. Unterschiedliche Datenbank-Daten (Wahrscheinlichste Ursache)

**Problem:** Die Daten in Supabase sind unterschiedlich zwischen lokaler und Vercel-Umgebung.

**Lösung:**
1. Prüfe die Supabase-Datenbank direkt:
   ```sql
   SELECT * FROM page_content WHERE page_section = 'hero';
   SELECT * FROM page_content WHERE page_section = 'leistungen';
   ```

2. Prüfe, ob `backgroundVideo` Feld vorhanden ist:
   ```sql
   SELECT content->>'backgroundVideo' FROM page_content WHERE page_section = 'hero';
   ```

3. Vergleiche die Daten mit dem API-Debug-Script:
   ```bash
   # Lokal
   curl http://localhost:3000/api/content/hero
   
   # Vercel (ersetze URL)
   curl https://deine-app.vercel.app/api/content/hero
   ```

### 2. Video-URL Probleme (CORS, Zugriff, etc.)

**Problem:** Video-URLs funktionieren lokal, aber nicht auf Vercel.

**Häufige Ursachen:**
- **CORS-Problem:** Video-Server erlaubt keine Anfragen von Vercel-Domain
- **Authentifizierung:** Video erfordert Auth-Token, der lokal vorhanden ist
- **Relative Pfade:** Video-URLs sind relativ und funktionieren nur lokal
- **Supabase Storage:** Videos in Supabase Storage benötigen öffentliche URLs

**Lösung:**
1. Prüfe Video-URLs in der Datenbank:
   ```sql
   SELECT content->>'backgroundVideo' FROM page_content WHERE page_section = 'hero';
   ```

2. Teste Video-URLs direkt im Browser:
   - Öffne die Video-URL direkt im Browser
   - Prüfe, ob sie öffentlich zugänglich ist
   - Prüfe Browser Console auf CORS-Fehler

3. Für Supabase Storage Videos:
   - Stelle sicher, dass der Storage-Bucket öffentlich ist
   - Verwende öffentliche URLs: `https://[project].supabase.co/storage/v1/object/public/[bucket]/[file]`
   - Prüfe Storage Policies in Supabase Dashboard

### 3. Build-Zeit vs. Runtime Daten

**Problem:** Next.js cached möglicherweise Daten zur Build-Zeit.

**Lösung:**
- Die API-Route hat bereits `export const dynamic = 'force-dynamic'` ✅
- Cache-Headers sind bereits auf `no-store` gesetzt ✅
- Falls Problem weiterhin besteht: Vercel Build-Cache leeren

### 4. Environment-spezifische Logik

**Problem:** Code verhält sich unterschiedlich in Development vs. Production.

**Prüfen:**
- Suche nach `process.env.NODE_ENV` Checks im Code
- Prüfe, ob es unterschiedliche Fallbacks gibt

## Debug-Schritte

### Schritt 1: API-Antworten vergleichen

```bash
# Installiere das Debug-Script
node scripts/debug-api-diff.js https://deine-app.vercel.app
```

Dieses Script vergleicht die API-Antworten zwischen lokal und Vercel.

### Schritt 2: Browser Console prüfen

1. Öffne Vercel-Deployment im Browser
2. Öffne DevTools → Console
3. Suche nach:
   - `[Hero]` Logs (Video-Lade-Status)
   - Video-Fehler (CORS, 404, etc.)
   - Network-Tab: Prüfe `/api/content/hero` Request

### Schritt 3: Supabase direkt prüfen

1. Gehe zu Supabase Dashboard
2. Öffne Table Editor → `page_content`
3. Filtere nach `page_section = 'hero'`
4. Prüfe das `content` JSON-Feld:
   ```json
   {
     "backgroundVideo": "https://...",
     "backgroundImage": "https://...",
     ...
   }
   ```

### Schritt 4: Video-URLs testen

```bash
# Teste Video-URL direkt
curl -I "https://deine-video-url.mp4"

# Prüfe CORS-Header
curl -H "Origin: https://deine-app.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     "https://deine-video-url.mp4"
```

## Häufige Probleme & Lösungen

### Problem: Video-URL ist Supabase Storage URL

**Lösung:**
1. Prüfe, ob der Storage-Bucket öffentlich ist
2. Verwende öffentliche URLs:
   ```
   https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[file]
   ```
3. Prüfe Storage Policies in Supabase Dashboard

### Problem: Video-URL ist relativ

**Lösung:**
- Stelle sicher, dass alle Video-URLs absolute URLs sind
- Relative URLs funktionieren nur lokal

### Problem: Video lädt, spielt aber nicht ab

**Lösung:**
- Prüfe Browser Console auf Autoplay-Fehler
- Browser blockieren möglicherweise Autoplay
- Prüfe `muted` Attribut (erforderlich für Autoplay)

### Problem: Unterschiedliche Leistungen

**Lösung:**
1. Prüfe `page_content` Tabelle für `page_section = 'leistungen'`
2. Vergleiche `items` Array zwischen lokal und Vercel
3. Prüfe, ob `backgroundVideo` Felder in Items vorhanden sind

## Code-Überprüfung

Die relevanten Komponenten:
- `components/sections/Hero.tsx` - Zeigt Video wenn `backgroundVideo` vorhanden
- `components/sections/Leistungen.tsx` - Zeigt Video in Items wenn `backgroundVideo` vorhanden
- `app/api/content/[section]/route.ts` - Liefert Daten aus Supabase

**Wichtig:** Die Komponenten prüfen auf `(data as any).backgroundVideo` - das Feld muss im JSON vorhanden sein!

## Quick Fix Checkliste

- [ ] Supabase-Datenbank direkt prüfen (`page_content` Tabelle)
- [ ] API-Antworten vergleichen (lokal vs. Vercel)
- [ ] Video-URLs testen (öffentlich zugänglich?)
- [ ] Browser Console auf Fehler prüfen
- [ ] Supabase Storage Policies prüfen (falls Videos in Storage)
- [ ] Vercel Build Logs prüfen
- [ ] Cache leeren (Browser + Vercel)

## Nächste Schritte

1. **Führe das Debug-Script aus:**
   ```bash
   node scripts/debug-api-diff.js https://deine-app.vercel.app
   ```

2. **Prüfe Supabase direkt:**
   - Öffne Supabase Dashboard
   - Prüfe `page_content` Tabelle
   - Vergleiche `content` JSON zwischen lokal und Vercel

3. **Prüfe Video-URLs:**
   - Sind sie öffentlich zugänglich?
   - Gibt es CORS-Probleme?
   - Funktionieren sie direkt im Browser?

4. **Prüfe Browser Console:**
   - Öffne Vercel-Deployment
   - Prüfe Console auf Fehler
   - Prüfe Network-Tab auf fehlgeschlagene Requests
