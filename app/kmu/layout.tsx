import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KMU Filmproduktion | bsp media GmbH | Professionelle Videos für Hidden Champions',
  description: 'Großes Kino für KMU. Professionelle Filmproduktion für Hidden Champions und Macher. Ohne Agentur-Overhead. Direkt, nordisch, hochwertig. Employer Branding, Recruiting, Social Media Content.',
}

export default function KMULayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

