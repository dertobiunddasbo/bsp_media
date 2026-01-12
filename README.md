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
# Supabase (erforderlich)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# reCAPTCHA (erforderlich für Kontaktformular)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# E-Mail Versand (Resend - optional, für Produktion empfohlen)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@bsp-media.de
CONTACT_EMAIL=hallo@bsp-media.de

# Optional: TinyMCE für Rich Text Editor im Admin
NEXT_PUBLIC_TINYMCE_API_KEY=your_tinymce_api_key

# Optional: Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**reCAPTCHA Setup:**
1. Gehe zu https://www.google.com/recaptcha/admin
2. Erstelle eine neue Site (reCAPTCHA v3)
3. Füge deine Domain hinzu
4. Kopiere Site Key und Secret Key in die `.env.local`

**Resend Setup (für E-Mail-Versand):**
1. Gehe zu https://resend.com und erstelle einen Account
2. Erstelle einen API Key
3. Füge `RESEND_API_KEY` in die `.env.local` ein
4. Optional: Konfiguriere eine Domain und setze `RESEND_FROM_EMAIL`

**Hinweis:** Wenn `RESEND_API_KEY` nicht gesetzt ist, werden E-Mails nur geloggt (für Development).

## Seiten

- `/` - Landing Page
- `/kontakt` - Kontaktformular mit reCAPTCHA
- `/impressum` - Impressum
- `/datenschutz` - Datenschutzerklärung
- `/agb` - Allgemeine Geschäftsbedingungen

