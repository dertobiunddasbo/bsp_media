import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Filmproduktion | bsp media GmbH | Pitch Videos & Investor Content',
  description: 'Professionelle Videos für Startups. Pitch-Videos, Product Demos und Launch Content, die Investoren überzeugen und Kunden gewinnen. Schnell, skalierbar, transparent.',
}

export default function StartupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

