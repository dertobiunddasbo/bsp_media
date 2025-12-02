# bsp media GmbH - Landing Page

Professionelle Landing Page für die bsp media GmbH, eine Filmproduktion aus Hamburg.

## Tech Stack

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Responsive Design** - Mobile First

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
npm start
```

Die Seite läuft dann unter `http://localhost:3000`

## Projektstruktur

```
bsp_media/
├── app/
│   ├── layout.tsx      # Root Layout
│   ├── page.tsx        # Hauptseite
│   └── globals.css     # Global Styles
├── components/
│   ├── Header.tsx      # Navigation
│   ├── Hero.tsx        # Hero Section
│   ├── TrustSection.tsx
│   ├── ValueProposition.tsx
│   ├── Leistungen.tsx
│   ├── AboutUs.tsx
│   └── Footer.tsx
└── ...
```

## Design

- **Farbschema**: Weißraum, Dark Grey (#1e282d), Akzent Rot/Pink (#e60050)
- **Typografie**: Kanit (Google Fonts)
- **Stil**: Corporate, Minimalistisch, High-End

## Setup

### Environment Variables

Erstelle eine `.env.local` Datei mit folgenden Variablen:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**reCAPTCHA Setup:**
1. Gehe zu https://www.google.com/recaptcha/admin
2. Erstelle eine neue Site (reCAPTCHA v3)
3. Füge deine Domain hinzu
4. Kopiere Site Key und Secret Key in die `.env.local`

### E-Mail Versand

Die API Route `/api/contact` ist vorbereitet, benötigt aber noch die Implementierung des E-Mail-Versands. 

**Optionen:**
- **Nodemailer** mit SMTP
- **Resend** (empfohlen für Next.js)
- **SendGrid**
- **AWS SES**

Beispiel mit Nodemailer:
```bash
npm install nodemailer
```

Dann in `/app/api/contact/route.ts` die TODO-Kommentare durch die tatsächliche E-Mail-Implementierung ersetzen.

## Seiten

- `/` - Landing Page
- `/kontakt` - Kontaktformular mit reCAPTCHA
- `/impressum` - Impressum
- `/datenschutz` - Datenschutzerklärung
- `/agb` - Allgemeine Geschäftsbedingungen

