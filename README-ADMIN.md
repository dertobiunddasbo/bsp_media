# Admin CMS Setup

## Supabase Setup

1. Erstelle ein Supabase-Projekt unter https://supabase.com
2. Gehe zu Settings > API und kopiere:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (wichtig: nur für Server-Side!)

3. Führe das SQL-Schema aus:
   - Gehe zu SQL Editor in Supabase
   - Kopiere den Inhalt von `supabase-schema.sql`
   - Führe es aus

4. Erstelle einen Admin-User:
   - Gehe zu Authentication > Users
   - Klicke "Add User" > "Create new user"
   - E-Mail und Passwort eingeben
   - User erstellen

## TinyMCE Setup

1. Gehe zu https://www.tiny.cloud/
2. Erstelle einen Account (kostenloser Plan verfügbar)
3. Kopiere deinen API-Key
4. Füge ihn in `.env.local` als `NEXT_PUBLIC_TINYMCE_API_KEY` ein

## Environment Variables

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_TINYMCE_API_KEY=your_tinymce_api_key
```

## Admin-Zugang

- URL: `/admin/login`
- Login mit dem erstellten Supabase-User

## Features

- ✅ Cases verwalten (CRUD)
- ✅ Bilder und Videos zu Cases hinzufügen
- ✅ WYSIWYG Editor für Beschreibungen
- ✅ Content-Management für Startseite
- ✅ Footer/Header Bearbeitung

## Sicherheit

⚠️ **Wichtig**: Der `SUPABASE_SERVICE_ROLE_KEY` sollte NIE im Client-Code verwendet werden!
Er wird nur in Server-Side API Routes verwendet (`lib/supabase-admin.ts`).













