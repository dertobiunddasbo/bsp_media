# Clean Architecture - BSP Media Website

## 🎯 Ziel
Eine moderne, saubere Corporate Filmproduktion Website mit:
- ✅ Editierbaren Seiten und Sections
- ✅ Bild- und Video-Integration
- ✅ Landing Page Erstellung
- ✅ SEO-Optimiert
- ✅ Ready für 2026

## 📁 Neue Struktur

```
components/
├── sections/              # Alle Sections (eine Version, Edit-Mode integriert)
│   ├── Hero.tsx
│   ├── Leistungen.tsx
│   ├── About.tsx
│   ├── Cases.tsx
│   └── ...
├── admin/                 # Admin-spezifische Komponenten
│   ├── EditModeBar.tsx
│   ├── SectionEditor.tsx
│   └── PageEditor.tsx
├── ui/                    # UI-Komponenten (Header, Footer, etc.)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
└── shared/                # Shared Components
    ├── EditableSection.tsx
    └── ImageUpload.tsx

app/
├── api/
│   ├── content/           # Content API (vereinheitlicht)
│   │   └── [section]/
│   │       └── route.ts
│   └── admin/             # Admin API
│       ├── content/
│       └── pages/
├── admin/                 # Admin Interface
│   ├── pages/
│   ├── content/
│   └── cases/
└── [slug]/                # Dynamische Seiten (Landing Pages)
    └── page.tsx
```

## 🔧 Design-Prinzipien

1. **Eine Komponente = Eine Verantwortung**
   - Sections haben Edit-Mode integriert
   - Keine Duplikate (Hero.tsx + HeroWithEdit.tsx)

2. **Konsistente API**
   - Einheitliches Datenmodell
   - Klare Endpoints

3. **SEO-First**
   - Metadata pro Seite
   - Structured Data
   - Sitemap

4. **Modern & Maintainable**
   - TypeScript strict
   - Klare Interfaces
   - Dokumentation

## 📊 Datenmodell

```typescript
// Section Content
interface SectionContent {
  hero: HeroData
  leistungen: LeistungenData
  about: AboutData
  // ...
}

// Page
interface Page {
  id: string
  slug: string
  title: string
  description: string
  sections: SectionContent
  seo: SEOData
  isActive: boolean
}
```

## 🚀 Implementierungs-Plan

1. ✅ Architektur planen
2. ⏳ Komponenten neu aufbauen
3. ⏳ API vereinheitlichen
4. ⏳ Admin-Interface
5. ⏳ SEO implementieren
6. ⏳ Alte Dateien entfernen

