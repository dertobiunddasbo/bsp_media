# Integration Plan - Visueller Editor

## Status:
✅ Edit-Mode System erstellt
✅ Admin-Seitenauswahl erstellt
✅ Hero Editor erstellt
✅ Leistungen Editor erstellt
✅ About Editor erstellt

## Noch zu integrieren:

### 1. Homepage (app/page.tsx)
- EditModeProvider hinzufügen wenn ?edit=true
- Hero → HeroWithEdit
- Leistungen → LeistungenWithEdit
- About → AboutWithEdit
- EditModal für alle Sections

### 2. Landing Pages
- KMU, Startups, etc. → EditModeProvider
- Hero → HeroWithEdit
- Weitere Sections nach Bedarf

### 3. "WithEdit" Wrapper-Komponenten erstellen
- LeistungenWithEdit
- AboutWithEdit
- CasesSectionWithEdit (optional)

## Nächste Schritte:
1. LeistungenWithEdit erstellen
2. AboutWithEdit erstellen
3. Homepage integrieren
4. Landing Pages integrieren

