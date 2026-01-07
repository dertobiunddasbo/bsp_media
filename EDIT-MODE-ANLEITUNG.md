# Edit-Mode Anleitung

## Wie aktiviere ich den Bearbeitungsmodus?

Der Bearbeitungsmodus wird über einen URL-Parameter aktiviert:

**URL:** `http://localhost:3000/?edit=true`

## Was passiert im Edit-Mode?

1. **EditModeBar erscheint oben** - Eine rote Leiste mit "Bearbeitungsmodus" und Buttons zum Speichern/Beenden
2. **Bearbeiten-Buttons erscheinen** - Bei jedem bearbeitbaren Bereich (Hero, Leistungen, About) erscheint beim Hovern ein "✏️ Bearbeiten" Button
3. **Edit-Modal öffnet sich** - Beim Klick auf "Bearbeiten" öffnet sich ein Modal zum Bearbeiten des Inhalts

## Bearbeitbare Bereiche:

- ✅ **Hero-Section** - Titel, Untertitel, Badge, Button-Text, Hintergrundbild
- ✅ **Leistungen-Section** - Titel, Untertitel, alle 5 Leistungen mit Bildern und Texten
- ✅ **About-Section** - Titel und Texte

## So funktioniert es:

1. Gehe zu: `http://localhost:3000/?edit=true`
2. Du siehst oben eine rote Leiste: "✏️ Bearbeitungsmodus"
3. Hovern über einen bearbeitbaren Bereich zeigt den "✏️ Bearbeiten" Button
4. Klick auf "✏️ Bearbeiten" öffnet das Edit-Modal
5. Änderungen vornehmen
6. "Speichern" klicken
7. Änderungen werden in der Datenbank gespeichert

## Troubleshooting:

### Edit-Mode wird nicht angezeigt?

1. **Prüfe die URL:** Muss `?edit=true` enthalten sein
2. **Browser-Cache leeren:** Strg+Shift+R (Windows) oder Cmd+Shift+R (Mac)
3. **Server neu starten:** `npm run dev`

### Bearbeiten-Buttons erscheinen nicht?

1. **Hovern über den Bereich** - Die Buttons erscheinen nur beim Hovern
2. **Prüfe ob EditModeBar sichtbar ist** - Wenn die rote Leiste oben fehlt, ist der Edit-Mode nicht aktiv
3. **Prüfe die Browser-Konsole** - Gibt es JavaScript-Fehler?

### Änderungen werden nicht gespeichert?

1. **Prüfe die Datenbank** - Gehe zu `/admin/content` und schaue, ob die Daten dort sind
2. **Prüfe die Browser-Konsole** - Gibt es Fehler beim Speichern?
3. **Prüfe die Network-Tab** - Wird die POST-Request erfolgreich gesendet?

## Alternative: Admin-Interface

Du kannst auch das Admin-Interface verwenden:
- **URL:** `http://localhost:3000/admin/content`
- **Vorteil:** Übersichtliche Liste aller bearbeitbaren Bereiche
- **Nachteil:** Keine visuelle Vorschau direkt auf der Seite


