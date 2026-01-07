# Visueller Live-Editor - Setup & Nutzung

## Was wurde erstellt:

1. **EditModeContext** - Verwaltet Edit-Mode State
2. **EditModeBar** - Toolbar am oberen Rand
3. **EditableSection** - Wrapper für editierbare Sections
4. **EditModal** - Modal für Editor
5. **HeroEditor** - Editor für Hero Section
6. **HeroWithEdit** - Hero Komponente mit Edit-Funktionalität

## So funktioniert es:

### 1. Edit-Mode aktivieren:
```
/admin/edit?page=home
/admin/edit?page=kmu
```

### 2. Sections bearbeiten:
- Hover über Section → "Bearbeiten" Button erscheint
- Click → Editor öffnet sich
- Änderungen machen
- "Änderungen speichern" → Daten werden gespeichert

### 3. Edit-Mode beenden:
- "Beenden" Button in der Toolbar

---

## Integration in Seiten:

### Homepage:
```tsx
// app/page.tsx
'use client'

import { Suspense } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/EditModeBar'
import HeroWithEdit from '@/components/HeroWithEdit'
// ... andere Components

export default function Home() {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'
  
  const content = (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroWithEdit pageSlug="home" />
      {/* andere Sections */}
    </main>
  )
  
  if (isEditMode) {
    return (
      <EditModeProvider>
        <EditModeBar />
        {content}
      </EditModeProvider>
    )
  }
  
  return content
}
```

---

## Status:

✅ Grundsystem erstellt
⏳ Integration in Seiten (Homepage, KMU, etc.)
⏳ Weitere Section Editors
⏳ Auto-Save Feature

---

## Nächste Schritte:

1. Homepage integrieren
2. Weitere Sections editierbar machen
3. Weitere Landing Pages integrieren

