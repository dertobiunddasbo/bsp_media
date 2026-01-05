# Landing Pages CMS - Aktueller Status

## ❌ Aktueller Status:
Die Landing Pages (KMU, Startups, Non-Profit, Öffentlicher Sektor, Agentur & Partner) sind **hardcodiert** und nicht über das CMS editierbar.

## ✅ Lösung: Neues System aktivieren

### Schritt 1: Schema in Supabase ausführen

1. Gehe zu: https://supabase.com/dashboard/project/bzsplxyxfouskjqysmen/sql/new
2. Öffne die Datei: `supabase-schema-extended.sql`
3. Kopiere den Inhalt
4. Führe das SQL in Supabase aus
5. Tabellen `pages` und `page_sections` werden erstellt

### Schritt 2: Landing Pages umstellen

Nachdem die Tabellen erstellt wurden, können wir die Landing Pages umstellen:

- `/kmu` → Lädt Daten von `/api/pages/kmu/sections`
- `/startups` → Lädt Daten von `/api/pages/startups/sections`
- `/non-profit` → Lädt Daten von `/api/pages/non-profit/sections`
- etc.

### Schritt 3: Admin-Interface

Das Admin-Interface `/admin/pages` wird dann funktionieren:
- Alle Seiten verwalten
- Sections pro Seite bearbeiten
- Flexibles JSONB-Format

---

## 📋 Landing Pages die es gibt:

1. `/kmu` - KMU Landing Page
2. `/startups` - Startups Landing Page
3. `/non-profit` - Non-Profit Landing Page
4. `/oeffentlicher-sektor` - Öffentlicher Sektor Landing Page
5. `/agentur-partner` - Agentur & Partner Landing Page

Alle haben ähnliche Strukturen:
- Hero Section
- Value Proposition
- Services/Benefits
- Contact Form

---

## 💡 Vorgehen:

**Option A: Jetzt aktivieren (empfohlen)**
1. Schema ausführen
2. Ich stelle die Landing Pages um
3. Dann sind alle Seiten editierbar

**Option B: Später**
- Erstmal nur Homepage nutzen
- Landing Pages bleiben hardcodiert
- Später umstellen wenn nötig

---

## 🎯 Vorteile des neuen Systems:

- ✅ Alle Seiten editierbar
- ✅ Flexibles JSONB-Format
- ✅ Sections pro Seite
- ✅ Einheitliches Admin-Interface
- ✅ Homepage UND Landing Pages

