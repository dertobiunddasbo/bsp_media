import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'bsp media GmbH - Audiovisuelle Kommunikation für Unternehmen & Institutionen',
  description: 'Imagefilme, Dokumentationen und Event-Content. Hanseatisch verlässlich, visuell exzellent.',
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

