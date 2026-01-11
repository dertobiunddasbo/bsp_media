# 🚀 Setup-Anleitung - bsp media Website

## ⚡ Schnellstart

### 1. Environment Variables einrichten

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=deine_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_anon_key
SUPABASE_SERVICE_ROLE_KEY=dein_service_role_key

# Optional: Site URL (für Production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: reCAPTCHA (für Kontaktformular)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein_site_key
RECAPTCHA_SECRET_KEY=dein_secret_key
```

### 2. Supabase Schema einrichten

**WICHTIG:** Führe diese SQL-Skripte in Supabase aus:

1. Gehe zu Supabase Dashboard > SQL Editor
2. Führe `supabase-schema.sql` aus (Basis-Schema)
3. Führe `supabase-schema-extended.sql` aus (Erweiterte Tabellen)

**Oder:** Nutze die Supabase CLI:
```bash
supabase db push
```

### 3. Dependencies installieren

```bash
npm install
```

### 4. Development Server starten

```bash
npm run dev
```

Die Website läuft dann unter `http://localhost:3000`

---

## 📋 Was wurde umgesetzt

### ✅ Build-Fehler behoben
- Alle API Routes als dynamisch markiert
- Build funktioniert jetzt ohne Fehler

### ✅ CMS-System
- **Homepage:** Nutzt `page_content` Tabelle
- **Landing Pages:** Nutzen `pages` + `page_sections` Tabellen
- Alle Sections sind editierbar über `/admin` Interface

### ✅ Frontend-Komponenten
- **Hero, Leistungen, About, Trust, Values, Principles, NDA, Footer** - Alle laden Daten aus DB
- Fallback auf Default-Daten wenn DB leer
- Edit-Mode funktioniert

### ✅ Portfolio & Cases
- Portfolio-Übersicht lädt Cases aus DB
- Case-Detail-Seiten sind dynamisch (`/portfolio/[slug]`)
- Bilder und Videos werden aus DB geladen

### ✅ Landing Pages
- Alle Landing Pages nutzen jetzt CMS-System
- Sections können pro Seite individuell bearbeitet werden

---

## 🎯 Admin-Interface

### Login
- URL: `http://localhost:3000/admin/login`
- Nutze deine Supabase Auth Credentials

### Content bearbeiten
- URL: `http://localhost:3000/admin/content` (Homepage)
- URL: `http://localhost:3000/admin/pages` (Alle Seiten)

### Cases verwalten
- URL: `http://localhost:3000/admin/cases`

### Edit-Mode auf Seiten
- Füge `?edit=true` zur URL hinzu
- Beispiel: `http://localhost:3000/?edit=true`

---

## 📁 Datenstruktur

### Tabellen:

1. **page_content** - Homepage Sections (altes System, funktioniert)
2. **pages** - Seiten-Metadaten
3. **page_sections** - Sections pro Seite
4. **cases** - Portfolio Cases
5. **case_images** - Bilder zu Cases
6. **case_videos** - Videos zu Cases

---

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Prüfe `.env.local` Datei
- Stelle sicher, dass alle Variablen gesetzt sind

### "Page not found" bei Landing Pages
- Führe `supabase-schema-extended.sql` aus
- Prüfe ob `pages` Tabelle existiert

### Sections werden nicht angezeigt
- Prüfe Browser Console für Fehler
- Stelle sicher, dass Daten in DB vorhanden sind
- Nutze Default-Daten als Fallback

### Build-Fehler
- Stelle sicher, dass alle API Routes `export const dynamic = 'force-dynamic'` haben
- Prüfe TypeScript-Fehler: `npm run build`

---

## 🚀 Production Deployment

### Vercel (empfohlen)

1. Push zu GitHub
2. Verbinde Repository mit Vercel
3. Füge Environment Variables hinzu
4. Deploy

### Environment Variables für Production:

```env
NEXT_PUBLIC_SUPABASE_URL=deine_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=dein_production_service_key
NEXT_PUBLIC_SITE_URL=https://deine-domain.de
```

---

## 📝 Nächste Schritte

1. **Media-Upload implementieren** (Supabase Storage)
2. **SEO optimieren** (Meta-Tags, Sitemap)
3. **Performance optimieren** (Image Optimization, Caching)
4. **Analytics einrichten** (Google Analytics, etc.)

---

## ✅ Checkliste vor Launch

- [ ] Environment Variables gesetzt
- [ ] Supabase Schema ausgeführt
- [ ] Build funktioniert (`npm run build`)
- [ ] Alle Seiten laden korrekt
- [ ] Admin-Login funktioniert
- [ ] Content kann bearbeitet werden
- [ ] Cases können verwaltet werden
- [ ] Kontaktformular funktioniert
- [ ] Mobile Responsive
- [ ] SEO Meta-Tags gesetzt

---

**Viel Erfolg! 🎉**

