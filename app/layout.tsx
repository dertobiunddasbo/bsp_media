import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'bsp media GmbH | Visuelle Kommunikation & Filmproduktion Hamburg',
  description: 'Die bsp media GmbH ist Ihr Partner für Corporate Video, E-Learning und interne Kommunikation. Prozesssicher, skalierbar und diskret. Filmproduktion aus Hamburg.',
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

