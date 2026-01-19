'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'
import Header from '@/components/ui/Header'
import Hero from '@/components/sections/Hero'
import TrustSection from '@/components/sections/TrustSection'
import NDADisclaimer from '@/components/sections/NDADisclaimer'
import ValueProposition from '@/components/sections/ValueProposition'
import Leistungen from '@/components/sections/Leistungen'
import CasesSection from '@/components/CasesSection'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import About from '@/components/sections/About'
import Footer from '@/components/sections/Footer'

function HomeContent() {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const content = (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero pageSlug="home" />
      <CasesSection />
      <Leistungen pageSlug="home" />
      <ValueProposition />
      <TrustSection />
      <WhyUs pageSlug="home" />
      <Testimonials pageSlug="home" />
      <FAQ pageSlug="home" />
      <About pageSlug="home" />
      <Footer />
    </main>
  )

  if (isEditMode) {
    return (
      <EditModeProvider initialEditMode={true}>
        <EditModeBar />
        <div className="pt-16">
          {content}
        </div>
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

