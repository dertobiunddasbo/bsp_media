# 🏗️ Clean Rebuild - Status

## Ziel
Ein komplett neues, sauberes System für die BSP Media Website:
- ✅ Moderne, wartbare Struktur
- ✅ Eine Komponente pro Section (keine Duplikate)
- ✅ SEO-optimiert
- ✅ Ready für 2026

## Neue Struktur

```
components/
├── sections/          # Sections (Hero, Leistungen, About, Cases)
├── admin/            # Admin-Komponenten (EditModeBar, Editors)
├── shared/           # Shared (EditableSection, EditModal)
└── ui/               # UI (Header, Footer)

lib/
├── types.ts          # Alle TypeScript Types
├── api.ts            # API Client
└── seo.ts            # SEO Utilities
```

## Status

### ✅ Phase 1: Foundation (DONE)
- [x] Types definiert
- [x] API Client erstellt
- [x] Plan dokumentiert

### ⏳ Phase 2: In Progress
- [ ] Shared Components verschieben/überarbeiten
- [ ] Sections neu schreiben
- [ ] Main Page aktualisieren

### ⏳ Phase 3: Pending
- [ ] SEO implementieren
- [ ] Alte Dateien entfernen
- [ ] Testing

## Nächste Schritte

1. Shared Components in neue Struktur verschieben
2. Sections komplett neu schreiben
3. Main Page aktualisieren
4. SEO hinzufügen
5. Cleanup

