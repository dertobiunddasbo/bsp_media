# Visueller Live-Editor - Plan

## Konzept (Squarespace-Style):

1. **Edit-Mode aktivieren:**
   - `/admin/edit?page=kmu` - Aktiviert Edit-Mode für KMU Seite
   - Overlay/Bar am oberen Rand mit "Speichern", "Beenden"

2. **Visuelles Editing:**
   - Hover über Sections zeigt "Edit" Button
   - Klick öffnet Inline-Editor für diese Section
   - Änderungen werden live angezeigt (WYSIWYG)

3. **Editor für verschiedene Section-Types:**
   - Hero: Textfelder, Bild-Upload
   - Services: Liste mit Drag & Drop
   - Text: Rich Text Editor (TinyMCE)

4. **Speichern:**
   - Änderungen werden in DB gespeichert
   - Auto-Save oder manuelles Speichern

---

## Technischer Ansatz:

### Option A: React Context + Edit Mode Hook
- Context für Edit-Mode State
- Components prüfen `isEditMode`
- Show Edit-Buttons on hover
- Modal/Overlay für Editor

### Option B: Separate Edit-Komponenten
- `HeroEditor`, `ServiceEditor`, etc.
- Rendern editierbare Version wenn `editMode=true`

### Option C: ContentEditable (einfacher, aber limitiert)
- ContentEditable für Text
- Formfelder für komplexere Strukturen

---

## Empfehlung: Option A + B Hybrid

1. **Edit-Mode Context:**
   ```tsx
   <EditModeProvider>
     <PageWithEditMode />
   </EditModeProvider>
   ```

2. **Edit-Overlays:**
   - Hover über Section → "Edit" Button
   - Click → Editor Modal/Overlay

3. **Editor Components:**
   - Wiederverwendbare Editor-Komponenten
   - Für jeden Section-Type

---

## Implementation Steps:

1. Edit-Mode Context/Hook erstellen
2. Edit-Overlay Komponente
3. Hero Editor (als erstes Beispiel)
4. Integration in KMU Seite
5. Weitere Section Editors
6. Auto-Save oder Save-Button

---

## Beispiel-UI:

```
┌─────────────────────────────────────┐
│ [💾 Speichern] [❌ Beenden]        │ ← Edit-Bar
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [✏️ Edit]                    │ ← Hover zeigt Button
│  │ Hero Section                 │
│  │ Title, Subtitle, etc.        │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [✏️ Edit]                    │
│  │ Services Section             │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

