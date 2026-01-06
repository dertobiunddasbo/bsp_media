'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/EditModeBar'
import Header from '@/components/Header'
import HeroWithEdit from '@/components/HeroWithEdit'
import TrustSection from '@/components/TrustSection'
import NDADisclaimer from '@/components/NDADisclaimer'
import ValueProposition from '@/components/ValueProposition'
import CollaborationPrinciples from '@/components/CollaborationPrinciples'
import LeistungenWithEdit from '@/components/LeistungenWithEdit'
import CasesSection from '@/components/CasesSection'
import AboutWithEdit from '@/components/AboutWithEdit'
import Footer from '@/components/Footer'

function HomeContent() {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const content = (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroWithEdit pageSlug="home" />
      <TrustSection />
      <NDADisclaimer />
      <ValueProposition />
      <CollaborationPrinciples />
      <LeistungenWithEdit pageSlug="home" />
      <CasesSection />
      <AboutWithEdit pageSlug="home" />
      <Footer />
    </main>
  )

  if (isEditMode) {
    return (
      <EditModeProvider>
        <EditModeBar />
        {content}
      </EditModeProvider>
    )
  }

  return content
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wird geladen...</div>}>
      <HomeContent />
    </Suspense>
  )
}

