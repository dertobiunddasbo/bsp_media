# Video-Problem Zusammenfassung

## ✅ Was funktioniert

1. **Datenbank-Inhalte:**
   - Hero-Section hat `backgroundVideo` in Supabase ✅
   - Video-URL ist korrekt gespeichert ✅
   - Video-URL ist öffentlich zugänglich (200 OK) ✅

2. **Code:**
   - Hero-Komponente unterstützt `backgroundVideo` ✅
   - Leistungen-Komponente unterstützt `backgroundVideo` ✅
   - API-Route liefert Daten korrekt ✅

## 🔍 Problem-Analyse

**Symptome:**
- Video wird lokal angezeigt ✅
- Video wird auf Vercel NICHT angezeigt ❌
- Unterschiedliche Leistungsbereiche zwischen lokal und Vercel

**Mögliche Ursachen:**

### 1. Unterschiedliche API-Antworten (Wahrscheinlichste Ursache)

Die API könnte unterschiedliche Daten zurückgeben zwischen lokal und Vercel.

**Prüfen:**
```bash
# Lokal
curl http://localhost:3000/api/content/hero | jq '.backgroundVideo'

# Vercel (ersetze URL)
curl https://deine-app.vercel.app/api/content/hero | jq '.backgroundVideo'
```

**Lösung:**
- Prüfe, ob die API-Antworten identisch sind
- Verwende das Debug-Script: `node scripts/debug-api-diff.js https://deine-app.vercel.app`

### 2. Browser CORS-Problem

Obwohl die Video-URL direkt zugänglich ist, könnte der Browser CORS-Probleme haben.

**Prüfen:**
1. Öffne Vercel-Deployment im Browser
2. Öffne DevTools → Console
3. Suche nach CORS-Fehlern
4. Prüfe Network-Tab → Video-Request → Response Headers

**Lösung:**
- Prüfe Supabase Storage CORS-Einstellungen
- Stelle sicher, dass CORS für deine Vercel-Domain erlaubt ist

### 3. Autoplay-Blockierung

Browser blockieren möglicherweise Autoplay auf Vercel, aber nicht lokal.

**Prüfen:**
- Browser Console auf Autoplay-Fehler
- Prüfe, ob `muted` Attribut gesetzt ist (ist es ✅)

### 4. Unterschiedliche Datenbank-Verbindungen

Lokal und Vercel könnten auf unterschiedliche Supabase-Projekte/Datasets zeigen.

**Prüfen:**
- Vergleiche `NEXT_PUBLIC_SUPABASE_URL` lokal vs. Vercel
- Prüfe, ob beide auf dasselbe Projekt zeigen

## 🔧 Debug-Schritte

### Schritt 1: API-Antworten vergleichen

```bash
node scripts/debug-api-diff.js https://deine-app.vercel.app
```

### Schritt 2: Browser Console prüfen

1. Öffne Vercel-Deployment
2. Öffne DevTools → Console
3. Suche nach:
   - `[Hero]` Logs
   - Video-Fehler
   - CORS-Fehler

### Schritt 3: Network-Tab prüfen

1. DevTools → Network
2. Filtere nach "video" oder "mp4"
3. Prüfe fehlgeschlagene Requests
4. Prüfe Response-Status und Headers

### Schritt 4: Supabase Storage prüfen

1. Supabase Dashboard → Storage
2. Prüfe Bucket `public_assets`
3. Prüfe Policies:
   - Ist der Bucket öffentlich?
   - Gibt es CORS-Einstellungen?
   - Sind die Policies korrekt?

## 🎯 Sofortige Aktionen

1. **Führe das API-Vergleichs-Script aus:**
   ```bash
   node scripts/debug-api-diff.js https://deine-app.vercel.app
   ```

2. **Prüfe Browser Console auf Vercel:**
   - Öffne die Vercel-URL
   - Öffne DevTools → Console
   - Kopiere alle Fehler/Warnungen

3. **Prüfe Network-Tab:**
   - DevTools → Network
   - Suche nach Video-Requests
   - Prüfe Status-Codes und Fehler

4. **Vergleiche Supabase-URLs:**
   - Lokal: `echo $NEXT_PUBLIC_SUPABASE_URL`
   - Vercel: Prüfe in Vercel Dashboard → Environment Variables

## 📊 Aktuelle Datenbank-Status

**Hero-Section:**
- ✅ `backgroundVideo` vorhanden
- ✅ Video-URL ist Supabase Storage URL
- ✅ Video ist öffentlich zugänglich (200 OK)
- ❌ `backgroundImage` fehlt (wird als Fallback verwendet)

**Leistungen:**
- ✅ 6 Items vorhanden
- ✅ Item 6 hat `backgroundVideo`
- ❌ Andere Items haben nur `image`, kein `backgroundVideo`

## 💡 Wahrscheinlichste Lösung

Basierend auf der Analyse ist das wahrscheinlichste Problem:

**Die API gibt unterschiedliche Daten zurück zwischen lokal und Vercel.**

**Mögliche Gründe:**
1. Unterschiedliche Supabase-Projekte/Datasets
2. Cache-Probleme (obwohl Cache-Headers gesetzt sind)
3. Timing-Probleme beim Laden

**Nächster Schritt:**
Führe das API-Vergleichs-Script aus, um die Unterschiede zu identifizieren!
