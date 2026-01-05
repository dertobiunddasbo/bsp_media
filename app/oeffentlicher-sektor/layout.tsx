import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Filmproduktion Öffentlicher Sektor | bsp media GmbH | Compliance-sichere Kommunikation',
  description: 'Professionelle Filmproduktion für Behörden, Verwaltungen und öffentliche Einrichtungen. DSGVO-konform, diskret, bürgernah. Compliance-sicher und budgetkonform.',
}

export default function OeffentlicherSektorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

