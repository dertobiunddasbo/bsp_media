import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'bsp media GmbH | Visuelle Kommunikation & Filmproduktion Hamburg',
    template: '%s | bsp media GmbH',
  },
  description: 'Die bsp media GmbH ist Ihr Partner für Corporate Video, E-Learning und interne Kommunikation. Prozesssicher, skalierbar und diskret. Filmproduktion aus Hamburg.',
  keywords: ['Filmproduktion', 'Corporate Video', 'E-Learning', 'Hamburg', 'Video Production', 'Audiovisuelle Kommunikation', 'Industrie', 'Luftfahrt'],
  authors: [{ name: 'bsp media GmbH' }],
  creator: 'bsp media GmbH',
  publisher: 'bsp media GmbH',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bsp-media.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/',
    siteName: 'bsp media GmbH',
    title: 'bsp media GmbH | Visuelle Kommunikation & Filmproduktion Hamburg',
    description: 'Die bsp media GmbH ist Ihr Partner für Corporate Video, E-Learning und interne Kommunikation. Prozesssicher, skalierbar und diskret.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'bsp media GmbH',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bsp media GmbH | Visuelle Kommunikation & Filmproduktion Hamburg',
    description: 'Die bsp media GmbH ist Ihr Partner für Corporate Video, E-Learning und interne Kommunikation.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification code can be added here
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  )
}

