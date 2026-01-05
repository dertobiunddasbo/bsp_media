# CMS Setup - Vollständiges Seiten-Management

Dieses System ermöglicht es, alle Seiten der Website über ein Admin-Interface zu verwalten, ähnlich wie Squarespace.

## Installation

### 1. Datenbankschema erweitern

Führe das erweiterte Schema in Supabase aus:

1. Gehe zu Supabase Dashboard → SQL Editor
2. Führe die Datei `supabase-schema-extended.sql` aus

Dies erstellt:
- `pages` Tabelle für Seiten-Metadaten
- `page_sections` Tabelle für Sections innerhalb von Seiten
- Initialisiert alle vorhandenen Seiten

### 2. Admin-Zugang

- URL: `/admin/login`
- Login mit deinem Supabase-User

## Features

### ✅ Seiten-Management (`/admin/pages`)

- Übersicht aller Seiten
- Seiten aktivieren/deaktivieren
- Zu jeder Seite navigieren

### ✅ Seiten-Editor (`/admin/pages/[slug]`)

- Sections innerhalb einer Seite verwalten
- Spezielle Editoren für:
  - **Hero Section**: Titel, Untertitel, Button, Hintergrundbild
  - **Leistungen Section**: Services mit Titel, Beschreibung, Bild
  - **Generic JSON Editor** für andere Sections

### ✅ Komponenten mit DB-Anbindung

- `Leistungen.tsx` - lädt Daten aus der Datenbank
- Weitere Komponenten können Schritt für Schritt umgestellt werden

## Verwendung

### Eine Seite bearbeiten

1. Gehe zu `/admin/pages`
2. Klicke auf "Bearbeiten" bei der gewünschten Seite
3. Wähle eine Section aus der Sidebar
4. Bearbeite den Content
5. Klicke auf "Speichern"

### Neue Section hinzufügen

1. Im Seiten-Editor auf "+ Section hinzufügen" klicken
2. Section-Key eingeben (z.B. "about", "contact")
3. Content im JSON-Editor bearbeiten

### Datenstruktur

Sections werden als JSONB in der Datenbank gespeichert. Beispiel für `leistungen`:

```json
{
  "title": "Unsere Leistungen",
  "subtitle": "Professionelle audiovisuelle Lösungen für Ihr Unternehmen",
  "items": [
    {
      "title": "Industrial Documentary",
      "description": "...",
      "image": "https://..."
    }
  ]
}
```

## API Routes

### Public Routes (für Frontend)

- `GET /api/pages/[slug]/sections` - Alle Sections einer Seite abrufen
- `GET /api/pages/[slug]/sections?section_key=leistungen` - Eine spezifische Section

### Admin Routes

- `GET /api/admin/pages` - Alle Seiten abrufen
- `GET /api/admin/pages?slug=home` - Eine Seite mit Sections
- `POST /api/admin/pages/[slug]/sections` - Section erstellen/aktualisieren

## Nächste Schritte

### Weitere Komponenten umstellen

Um weitere Komponenten auf DB umzustellen:

1. API-Route verwenden: `/api/pages/home/sections?section_key=[section_key]`
2. Komponente als Client Component (`'use client'`)
3. useEffect zum Laden der Daten
4. Fallback-Daten für Development

### Beispiel

```tsx
'use client'
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/pages/home/sections?section_key=mySection')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  // Render component with data
}
```

### Bild-Upload

Für Bild-Uploads kann Supabase Storage verwendet werden. Aktuell werden Bilder als URLs gespeichert.

## Seiten-Übersicht

Folgende Seiten sind im System registriert:

- `home` - Startseite
- `kmu` - KMU-Seite
- `startups` - Startups-Seite
- `non-profit` - Non-Profit-Seite
- `oeffentlicher-sektor` - Öffentlicher Sektor
- `agentur-partner` - Agentur & Partner
- `kontakt` - Kontaktseite
- `portfolio` - Portfolio
- `impressum` - Impressum
- `datenschutz` - Datenschutz
- `agb` - AGB

Alle können über `/admin/pages` verwaltet werden.

