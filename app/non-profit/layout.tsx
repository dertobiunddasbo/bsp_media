import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Non-Profit Filmproduktion | bsp media GmbH | Videos für Stiftungen & soziale Organisationen',
  description: 'Professionelle Filmproduktion für Stiftungen, Vereine und soziale Organisationen. Emotionale Geschichten, die Spender gewinnen und Botschaften transportieren. Faire Preise für den guten Zweck.',
}

export default function NonProfitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

