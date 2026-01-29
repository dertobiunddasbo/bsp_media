import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '24h Ideen-Check',
  description: 'Schicken Sie uns Ihr Video-Konzept oder Skript. Wir geben Ihnen innerhalb eines Werktages fachliches Feedback zu Story, Wirkung und Machbarkeit. Kostenlos und ohne Kaufzwang.',
  openGraph: {
    title: '24h Ideen-Check',
    description: 'Fachliches Feedback zu Ihrer Video-Idee innerhalb von 24 Stunden. Kostenlos, ehrlich, ohne Kaufzwang.',
    url: '/ideen-check',
  },
}

export default function IdeenCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
