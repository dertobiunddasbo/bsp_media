# Vercel vs. Lokale Version - Debug Checkliste

## 🔍 Häufige Ursachen für Unterschiede

### 1. ✅ Git Status prüfen
**Status:** Nur `.next/` Build-Artefakte geändert (normal, diese sollten nicht committed werden)

**Nächste Schritte:**
```bash
# Prüfe, ob alle wichtigen Dateien committed sind
git status
git log --oneline -5  # Prüfe letzte Commits
```

### 2. 🔑 Umgebungsvariablen (WICHTIGSTE URSACHE!)

**Lokale Variablen gefunden:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_TINYMCE_API_KEY`

**⚠️ KRITISCH:** Diese müssen auch auf Vercel konfiguriert sein!

**Vercel Environment Variables prüfen:**
1. Gehe zu: https://vercel.com/dashboard → Dein Projekt → Settings → Environment Variables
2. Prüfe, ob ALLE diese Variablen vorhanden sind:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_TINYMCE_API_KEY` (optional)
   - `RECAPTCHA_SECRET_KEY` (falls verwendet)
   - `RESEND_API_KEY` (falls verwendet)
   - `RESEND_FROM_EMAIL` (falls verwendet)
   - `CONTACT_EMAIL` (falls verwendet)

3. **WICHTIG:** `NEXT_PUBLIC_*` Variablen müssen für alle Environments (Production, Preview, Development) gesetzt sein!

### 3. 🔄 Build-Cache auf Vercel

**Problem:** Vercel könnte einen alten Build-Cache verwenden.

**Lösung:**
1. Gehe zu: Vercel Dashboard → Dein Projekt → Deployments
2. Klicke auf das neueste Deployment → "Redeploy"
3. Wähle "Use existing Build Cache" → **DEAKTIVIEREN** (unchecked)
4. Klicke "Redeploy"

**Oder via CLI:**
```bash
vercel --force
```

### 4. 📦 Node Version

**Prüfe lokale Node Version:**
```bash
node --version
```

**Auf Vercel prüfen:**
1. Vercel Dashboard → Settings → General
2. Prüfe "Node.js Version"
3. Stelle sicher, dass sie mit deiner lokalen Version übereinstimmt

**Falls unterschiedlich:** Setze in `package.json`:
```json
{
  "engines": {
    "node": "20.x"  // oder deine Version
  }
}
```

### 5. 🗄️ Supabase Datenbank

**Problem:** Lokale und Vercel-Version könnten auf unterschiedliche Supabase-Projekte/Datasets zeigen.

**Prüfen:**
1. Vergleiche `NEXT_PUBLIC_SUPABASE_URL` lokal vs. Vercel
2. Prüfe, ob die Daten in Supabase für beide Umgebungen gleich sind
3. Prüfe Supabase Logs für Fehler

### 6. 🏗️ Build-Konfiguration

**Prüfe `next.config.js`:**
- Keine speziellen Build-Einstellungen, die lokal anders sein könnten

**Prüfe `package.json`:**
- Build-Script ist standard: `"build": "next build"`

### 7. 🌐 Browser-Cache

**Problem:** Dein Browser zeigt möglicherweise eine gecachte Version.

**Lösung:**
- Hard Refresh: `Cmd+Shift+R` (Mac) oder `Ctrl+Shift+R` (Windows)
- Oder: Incognito/Private Window öffnen
- Oder: Browser-Cache leeren

### 8. 📱 Unterschiedliche Datenquellen

**Hero-Komponente lädt Daten von:** `/api/content/hero`

**Prüfen:**
1. Öffne Browser DevTools → Network Tab
2. Prüfe, ob `/api/content/hero` unterschiedliche Daten zurückgibt
3. Prüfe Console für Fehler

## 🔧 Schnelle Debug-Schritte

### Schritt 1: Vercel Environment Variables prüfen
```bash
# Installiere Vercel CLI (falls nicht vorhanden)
npm i -g vercel

# Login
vercel login

# Prüfe Environment Variables
vercel env ls
```

### Schritt 2: Lokalen Production Build testen
```bash
# Lokalen Production Build erstellen
npm run build
npm start

# Öffne http://localhost:3000
# Vergleiche mit Vercel-Version
```

### Schritt 3: Vercel Build Logs prüfen
1. Gehe zu: Vercel Dashboard → Dein Projekt → Deployments
2. Klicke auf das neueste Deployment
3. Öffne "Build Logs"
4. Suche nach Fehlern oder Warnungen

### Schritt 4: API-Endpunkte direkt testen
```bash
# Lokal
curl http://localhost:3000/api/content/hero

# Vercel (ersetze mit deiner URL)
curl https://deine-app.vercel.app/api/content/hero
```

Vergleiche die Antworten!

## 🎯 Meist wahrscheinliche Ursachen (in Reihenfolge)

1. **Umgebungsvariablen fehlen auf Vercel** (90% Wahrscheinlichkeit)
2. **Build-Cache auf Vercel** (5% Wahrscheinlichkeit)
3. **Unterschiedliche Supabase-Daten** (3% Wahrscheinlichkeit)
4. **Browser-Cache** (2% Wahrscheinlichkeit)

## ✅ Quick Fix Checkliste

- [ ] Alle Environment Variables auf Vercel gesetzt?
- [ ] `NEXT_PUBLIC_*` Variablen für alle Environments (Production, Preview, Development)?
- [ ] Vercel Build-Cache geleert?
- [ ] Lokaler Production Build getestet?
- [ ] Browser-Cache geleert?
- [ ] API-Endpunkte direkt verglichen?
- [ ] Vercel Build Logs auf Fehler geprüft?

## 📞 Nächste Schritte

1. **Zuerst:** Prüfe Vercel Environment Variables (siehe oben)
2. **Dann:** Redeploy mit geleertem Cache
3. **Falls immer noch unterschiedlich:** Prüfe API-Endpunkte direkt
4. **Falls API unterschiedlich:** Prüfe Supabase-Verbindung
