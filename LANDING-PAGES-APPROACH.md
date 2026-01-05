# Landing Pages CMS - Vorgehensweise

## Situation:
Die Landing Pages haben viele Sections (Hero, Value Proposition, Services, etc.), die alle umgestellt werden müssen.

## Optionen:

### Option A: Schritt für Schritt (empfohlen)
1. **Hero Section** umstellen (wichtigste Section)
2. Weitere Sections nach Bedarf umstellen
3. Jede Section einzeln testen

### Option B: Komplett umstellen
- Alle Sections auf einmal umstellen
- Mehr Arbeit, aber komplett editierbar

### Option C: Hybrid-Lösung
- Hero Section aus DB (wichtigste)
- Reste Sections bleiben hardcodiert (können später umgestellt werden)

---

## Empfehlung:
**Option A** - Schritt für Schritt, beginnend mit Hero Section

---

## Datenstruktur in DB:

Für `/kmu` Seite:
- `hero` section
- `value_proposition` section  
- `services` section
- etc.

Jede Section hat JSONB-Content, der flexibel strukturiert werden kann.

