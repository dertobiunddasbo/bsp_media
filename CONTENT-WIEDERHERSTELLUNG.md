# Content-Wiederherstellung

## Problem
Nach der CMS-Umstellung fehlten Hero-Header und Leistungen-Section auf der Website.

## Lösung
Die Standard-Texte wurden wieder in die Datenbank eingefügt.

## Was wurde gemacht:

1. **Seed-Script erstellt** (`scripts/seed-content.ts`)
   - Fügt Standard-Content für Hero, Leistungen und About in die Datenbank ein
   - Kann jederzeit wieder ausgeführt werden

2. **Datenbank befüllt**
   - Hero-Section: Titel, Untertitel, Badge, Button-Text, Hintergrundbild
   - Leistungen-Section: Alle 5 Leistungen mit Titeln, Beschreibungen und Bildern
   - About-Section: Titel und Text

## Standard-Texte die jetzt in der DB sind:

### Hero:
- **Badge:** "Filmproduktion Hamburg"
- **Titel:** "High-End Kommunikation für die operative Realität."
- **Untertitel:** "Wir bringen Ihre Strategie dorthin, wo keine E-Mails gelesen werden. Die Produktionspartner für Konzerne mit komplexen Strukturen. Schnell, diskret und broadcast-ready."
- **Button:** "Verfügbarkeit prüfen"

### Leistungen:
1. Industrial Documentary
2. Knowledge & Academy
3. Motion & Explanation
4. Corporate Newsroom
5. Recruiting

### About:
- Titel: "Dokumentarische DNA für Corporate Challenges."

## Script ausführen:

Falls die Daten wieder fehlen sollten, kann das Script erneut ausgeführt werden:

```bash
npm run seed:content
```

## Content bearbeiten:

Die Texte können jetzt im Admin-Interface bearbeitet werden:
- http://localhost:3000/admin/content

## Status:
✅ Hero-Section sollte jetzt angezeigt werden
✅ Leistungen-Section sollte jetzt angezeigt werden
✅ About-Section sollte jetzt angezeigt werden

Falls die Inhalte immer noch nicht angezeigt werden:
1. Browser-Cache leeren (Strg+Shift+R / Cmd+Shift+R)
2. Development-Server neu starten
3. Prüfen ob die API-Route `/api/content/hero` Daten zurückgibt


