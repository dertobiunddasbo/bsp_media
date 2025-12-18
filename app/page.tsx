import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import NDADisclaimer from '@/components/NDADisclaimer'
import ValueProposition from '@/components/ValueProposition'
import CollaborationPrinciples from '@/components/CollaborationPrinciples'
import Leistungen from '@/components/Leistungen'
import CasesSection from '@/components/CasesSection'
import AboutUs from '@/components/AboutUs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustSection />
      <NDADisclaimer />
      <ValueProposition />
      <CollaborationPrinciples />
      <Leistungen />
      <CasesSection />
      <AboutUs />
      <Footer />
    </main>
  )
}

