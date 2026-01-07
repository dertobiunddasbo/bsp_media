# Nächste Schritte - Visueller Editor

## ✅ Was bereits funktioniert:

1. **Admin-Interface:**
   - `/admin/edit` - Seitenauswahl
   - Link im Admin-Menü

2. **Edit-Mode System:**
   - EditModeContext, EditModeBar, EditableSection, EditModal

3. **Editoren:**
   - HeroEditor, LeistungenEditor, AboutEditor

## 📋 Was noch zu tun ist:

Die vollständige Integration aller Sections in alle Seiten ist sehr umfangreich. 

### Option A: Schrittweise Integration (empfohlen)

1. **Homepage mit Hero integrieren** (erstes Beispiel)
   - EditModeProvider in app/page.tsx
   - HeroWithEdit verwenden
   - Testen

2. **Weitere Sections hinzufügen:**
   - Leistungen → WithEdit-Version erstellen
   - About → WithEdit-Version erstellen
   - etc.

3. **Landing Pages:**
   - Gleiches System für Landing Pages

### Option B: Vollständige Integration auf einmal

- Alle Komponenten auf einmal umstellen
- Sehr viel Code
- Aber dann ist alles fertig

---

## 💡 Empfehlung:

**Option A** - Schrittweise, damit wir es testen können.

Soll ich:
1. Erstmal die Homepage mit Hero integrieren (funktioniert sofort)?
2. Oder alles auf einmal machen?

