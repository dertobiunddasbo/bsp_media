# CMS Admin-Pfade

## Bestehende CMS-Interfaces:

### 1. **Content-Management (Homepage)**
- **URL:** `/admin/content`
- **Funktion:** Bearbeitung der Homepage-Sections
- **Tabelle:** `page_content`
- **Sections:** hero, leistungen, about, footer, header

### 2. **Cases-Management (Portfolio)**
- **URL:** `/admin/cases`
- **Funktion:** Portfolio Cases verwalten (CRUD)
- **Tabelle:** `cases`, `case_images`, `case_videos`

### 3. **Admin-Dashboard**
- **URL:** `/admin`
- **Funktion:** Übersicht mit Links zu allen Admin-Bereichen

### 4. **Login**
- **URL:** `/admin/login`
- **Funktion:** Admin-Login (Supabase Auth)

---

## Neu hinzugefügt (von mir):

### 5. **Seiten-Management (Alle Seiten)**
- **URL:** `/admin/pages`
- **Funktion:** Alle Seiten verwalten und bearbeiten
- **Tabellen:** `pages`, `page_sections` (müssen erst erstellt werden!)
- **Status:** ⚠️ Benötigt `supabase-schema-extended.sql`

---

## Direktzugriff:

- **Dashboard:** http://localhost:3000/admin
- **Content:** http://localhost:3000/admin/content
- **Cases:** http://localhost:3000/admin/cases
- **Pages (neu):** http://localhost:3000/admin/pages
- **Login:** http://localhost:3000/admin/login

