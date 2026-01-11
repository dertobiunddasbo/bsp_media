# ⚡ Quick Start - bsp media Website

## 🚀 In 5 Minuten startklar

### 1. Environment Variables

Erstelle `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=deine_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_key
SUPABASE_SERVICE_ROLE_KEY=dein_service_key
```

### 2. Supabase Schema

**IMPORTANT:** Führe in Supabase SQL Editor aus:
- `supabase-schema.sql` (Basis)
- `supabase-schema-extended.sql` (Erweitert)

### 3. Start

```bash
npm install
npm run dev
```

✅ Fertig! Website läuft auf `http://localhost:3000`

---

## 📍 Wichtige URLs

- **Homepage:** `http://localhost:3000`
- **Admin Login:** `http://localhost:3000/admin/login`
- **Content bearbeiten:** `http://localhost:3000/admin/content`
- **Cases verwalten:** `http://localhost:3000/admin/cases`
- **Edit-Mode:** Füge `?edit=true` zur URL hinzu

---

## ✅ Was funktioniert

- ✅ Build ohne Fehler
- ✅ CMS für alle Sections
- ✅ Portfolio mit Cases aus DB
- ✅ Landing Pages mit CMS
- ✅ Admin-Interface
- ✅ Edit-Mode auf allen Seiten

---

## 🐛 Probleme?

1. **"Missing environment variables"** → Prüfe `.env.local`
2. **"Page not found"** → Führe `supabase-schema-extended.sql` aus
3. **Sections leer?** → Nutze Default-Daten oder fülle DB im Admin

---

**Viel Erfolg! 🎉**

