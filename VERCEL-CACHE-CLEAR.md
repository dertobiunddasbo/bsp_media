# Vercel Cache leeren - Anleitung

Es gibt mehrere Möglichkeiten, den Vercel Cache zu leeren:

## 1. **Via Vercel Dashboard (Empfohlen)**

### Schritt 1: Vercel Dashboard öffnen
1. Gehe zu [vercel.com](https://vercel.com) und logge dich ein
2. Wähle dein Projekt aus

### Schritt 2: Cache leeren
**Option A: Einzelnes Deployment leeren**
1. Gehe zu **Deployments** Tab
2. Klicke auf das **"..."** (drei Punkte) Menü rechts neben einem Deployment
3. Wähle **"Redeploy"** oder **"Purge Cache"** (falls verfügbar)

**Option B: Cache für alle Deployments leeren**
1. Gehe zu **Settings** → **General**
2. Scrolle zu **Cache** Sektion
3. Klicke auf **"Clear Cache"** oder **"Purge All Caches"**

## 2. **Via Vercel CLI**

### Vercel CLI installieren (falls nicht vorhanden):
```bash
npm i -g vercel
```

### Login:
```bash
vercel login
```

### Cache für ein Deployment löschen:
```bash
# Für Production
vercel --prod

# Oder redeploy mit Cache-Busting
vercel --prod --force
```

## 3. **Via Vercel API (Programmatisch)**

Du kannst auch die Vercel API verwenden, um den Cache zu löschen:

```bash
# Hole dein Vercel API Token von: vercel.com/account/tokens
curl -X DELETE \
  "https://api.vercel.com/v1/deployments/{deployment-id}" \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN"
```

## 4. **Automatisch beim Deployment**

Der einfachste Weg: **Einfach neu deployen**

Jedes neue Deployment erstellt einen neuen Build, der den Cache automatisch invalidiert.

### Trigger ein neues Deployment:
```bash
# Push einen leeren Commit
git commit --allow-empty -m "Trigger rebuild to clear cache"
git push
```

## 5. **Browser Cache leeren (lokal)**

Auch der Browser kann gecachte Inhalte haben:

### Chrome/Edge:
- **Hard Refresh**: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)
- Oder: Developer Tools (F12) → Rechtsklick auf Reload-Button → **"Empty Cache and Hard Reload"**

### Firefox:
- **Hard Refresh**: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)

### Safari:
- **Hard Refresh**: `Cmd + Option + R` (Mac)

## 6. **Cache für spezifische API-Route löschen**

Falls nur eine bestimmte API-Route gecacht ist, kannst du:

1. **Die URL direkt aufrufen mit Cache-Bust-Parameter:**
   ```
   https://deine-app.vercel.app/api/content/hero?t=1234567890
   ```

2. **Oder über curl mit no-cache Headers:**
   ```bash
   curl -H "Cache-Control: no-cache" \
        https://deine-app.vercel.app/api/content/hero
   ```

## ⚠️ Wichtige Hinweise:

- **Vercel Edge Cache**: Kann bis zu 1-2 Minuten dauern, bis Änderungen sichtbar sind
- **CDN Cache**: Kann bis zu 24 Stunden dauern (bei Production)
- **Build Cache**: Wird bei jedem neuen Deployment automatisch geleert

## 🎯 Für dein Video-Problem:

**Empfohlener Vorgang:**
1. ✅ Code ist bereits gepusht (mit Cache-Control Headers)
2. 🔄 Warte auf automatisches Deployment auf Vercel
3. ⏱️ Warte 1-2 Minuten nach erfolgreichem Deployment
4. 🔍 Öffne die Seite im **Incognito/Private Mode** (um Browser-Cache zu vermeiden)
5. 📊 Prüfe die Vercel Logs, um zu sehen welche URL zurückgegeben wird

## 🐛 Debug-Tipp:

Wenn das Problem weiterhin besteht:
1. Öffne Vercel Dashboard → Deployments → Neuestes Deployment → **Runtime Logs**
2. Suche nach: `[API /api/content/hero] Returning content:`
3. Prüfe, welche `backgroundVideo` URL dort geloggt wird
