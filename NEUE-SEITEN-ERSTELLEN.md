# Neue Seiten erstellen - Anleitung

## ✅ Funktion hinzugefügt!

Du kannst jetzt neue Seiten über das Backend erstellen.

## Voraussetzungen

**WICHTIG:** Die Tabellen `pages` und `page_sections` müssen in der Datenbank existieren!

### Schema ausführen (falls noch nicht geschehen):

1. Gehe zu deinem Supabase Dashboard
2. Öffne den SQL Editor
3. Führe `supabase-schema-extended.sql` aus
4. Die Tabellen `pages` und `page_sections` werden erstellt

## So erstellst du eine neue Seite:

### Schritt 1: Admin-Interface öffnen
- Gehe zu: `http://localhost:3000/admin/pages`
- Du musst eingeloggt sein (über `/admin/login`)

### Schritt 2: Neue Seite erstellen
1. Klicke auf den Button **"+ Neue Seite erstellen"** (oben rechts)
2. Ein Modal öffnet sich

### Schritt 3: Daten eingeben
- **Titel** (Pflichtfeld): z.B. "Über uns"
- **Slug** (Pflichtfeld): z.B. "ueber-uns"
  - Wird automatisch formatiert (Kleinbuchstaben, Bindestriche)
  - Wird zur URL: `/ueber-uns`
- **Beschreibung** (optional): Kurze Beschreibung

### Schritt 4: Speichern
- Klicke auf "Seite erstellen"
- Die Seite wird in der Datenbank erstellt

## Was passiert danach?

1. **Seite wird in der Liste angezeigt**
   - Du siehst sie in der Tabelle bei `/admin/pages`
   - Status: "Aktiv" (standardmäßig)

2. **Seite bearbeiten**
   - Klicke auf "Bearbeiten" bei der Seite
   - Du kannst Sections (Hero, Leistungen, etc.) hinzufügen

3. **Seite ansehen**
   - Klicke auf "Ansehen →" um die Seite zu öffnen
   - **WICHTIG:** Die Seite muss noch als Next.js Route erstellt werden!

## ⚠️ Wichtiger Hinweis

**Die Seite wird in der Datenbank erstellt, aber es fehlt noch die Next.js Route!**

Nach dem Erstellen einer neuen Seite musst du:

1. **Next.js Route erstellen:**
   - Erstelle eine Datei: `app/[slug]/page.tsx` (dynamische Route)
   - Oder: Erstelle eine spezifische Route: `app/ueber-uns/page.tsx`

2. **Die Route sollte:**
   - Daten aus der Datenbank laden (`/api/pages/[slug]/sections`)
   - Die Sections rendern (Hero, Leistungen, etc.)
   - Den Edit-Mode unterstützen

## Beispiel: Dynamische Route für alle Seiten

Erstelle `app/[slug]/page.tsx`:

```tsx
'use client'

import { use } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroWithEdit from '@/components/HeroWithEdit'
import LeistungenWithEdit from '@/components/LeistungenWithEdit'
import AboutWithEdit from '@/components/AboutWithEdit'

export default function DynamicPage() {
  const params = useParams()
  const slug = params.slug as string

  // Lade Sections aus der Datenbank
  // Rendere die Sections basierend auf den Daten

  return (
    <>
      <Header />
      <main>
        <HeroWithEdit pageSlug={slug} />
        <LeistungenWithEdit pageSlug={slug} />
        <AboutWithEdit pageSlug={slug} />
      </main>
      <Footer />
    </>
  )
}
```

## Funktionen

- ✅ **Neue Seite erstellen** - Mit Modal-Formular
- ✅ **Seiten auflisten** - Alle Seiten in einer Tabelle
- ✅ **Seite bearbeiten** - Sections hinzufügen/bearbeiten
- ✅ **Seite aktivieren/deaktivieren** - Status umschalten
- ✅ **Seite löschen** - Mit Bestätigung
- ✅ **Seite ansehen** - Link zur Frontend-Seite

## Troubleshooting

### "Fehler beim Laden der Seiten"
- **Ursache:** Tabellen existieren nicht in der Datenbank
- **Lösung:** `supabase-schema-extended.sql` ausführen

### "Seite wird nicht angezeigt"
- **Ursache:** Next.js Route fehlt
- **Lösung:** Route erstellen (siehe oben)

### "Slug bereits vorhanden"
- **Ursache:** Eine Seite mit diesem Slug existiert bereits
- **Lösung:** Anderen Slug verwenden


