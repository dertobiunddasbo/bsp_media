'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AgenturPartnerPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section-id')
          if (id) {
            setVisibleSections((prev) => new Set(prev).add(id))
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('[data-section-id]')
    sections.forEach((section) => observer.observe(section))

    observers.push(observer)

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section
        data-section-id="hero"
        className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden transition-opacity duration-1000 ${
          visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
              Wir lieben den Corporate Content, für den eure Kreativen keine Zeit haben.
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
              Die skalierbare Production-Unit für Agenturen. Wir setzen eure Strategie um – im DAX-Konzern, am Fließband und im Boardroom. Diskret, white-label, stressfrei.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={scrollToContact}
                className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Partner-Deck anfordern
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <Link
                href="/portfolio"
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Showreel ansehen
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Pain Grid */}
      <section
        data-section-id="pain-grid"
        className={`py-32 bg-zinc-950 transition-opacity duration-1000 delay-200 ${
          visibleSections.has('pain-grid') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Entlastung */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Eure Kreativen wollen Löwen gewinnen...
                </h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                ...nicht Compliance-Updates drehen. Wir übernehmen das High-Volume-Geschäft (Change, E-Learning, CEO-Updates), damit euer Core-Team den Kopf für die großen Kampagnen frei hat.
              </p>
            </div>

            {/* Card 2: Skalierung */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  20 Leute statt 5 Freelancer.
                </h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Ihr braucht 50 Assets in 48 Stunden? Wir sind keine zusammengewürfelte Crew, sondern eine eingespielte Unit mit eigener Post-Production in Hamburg.
              </p>
            </div>

            {/* Card 3: Sicherheit */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  White Label & NDA-Profis.
                </h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Wir tragen eure T-Shirts am Set. Wir kennen die Konzerne (Aldi, Ford, BVG) und wissen, wie man sich im Hochsicherheitsbereich bewegt. Euer Kunde bleibt euer Kunde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Execution */}
      <section
        data-section-id="proven-execution"
        className={`py-32 bg-black transition-opacity duration-1000 delay-300 ${
          visibleSections.has('proven-execution') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Erfahren in komplexen Strukturen:
          </h2>
          
          {/* Logo Strip */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {['Ford', 'ALDI SÜD', 'Vodafone', 'BVG', 'Flughafen Hamburg'].map((client, index) => (
              <div
                key={index}
                className="aspect-[3/2] bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:border-zinc-700 transition-colors"
              >
                <span className="text-gray-400 text-sm font-semibold uppercase text-center px-3 grayscale">
                  {client}
                </span>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/30 rounded-full">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-accent font-semibold">
                100% Kundenschutz-Garantie für Agenturpartner.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section
        data-section-id="service-pillars"
        className={`py-32 bg-zinc-950 transition-opacity duration-1000 delay-400 ${
          visibleSections.has('service-pillars') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1: Corporate Newsroom */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Corporate Newsroom
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Wöchentliche CEO-Updates & interne News. Wir liefern TV-Qualität im 24h-Turnaround.
              </p>
            </div>

            {/* Pillar 2: Masterclass Academy */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Masterclass Academy
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Hochwertiges E-Learning. Wir übersetzen trockenes Wissen in cineastische Formate.
              </p>
            </div>

            {/* Pillar 3: Co-Creation */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Co-Creation
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Ihr macht die Markenstrategie, wir entwickeln die Formate, die in der operativen Realität funktionieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boardroom Ready */}
      <section
        data-section-id="boardroom-ready"
        className={`py-32 bg-black transition-opacity duration-1000 delay-500 ${
          visibleSections.has('boardroom-ready') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Wir sprechen C-Level.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Unsere Regisseure wissen, wie man einen CEO führt, der nur 5 Minuten Zeit hat. Effizient, politisch korrekt und ohne Händchenhalten.
          </p>
        </div>
      </section>

      {/* Contact / Conversion */}
      <section
        id="contact-section"
        data-section-id="contact"
        className={`py-32 bg-zinc-950 transition-opacity duration-1000 delay-600 ${
          visibleSections.has('contact') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Erweitert eure Kapazität.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 leading-relaxed">
            Lass uns sprechen: Über White-Label-Konditionen und wie wir euren nächsten Pitch unterstützen können.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/kontakt"
              className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Jetzt Kontakt aufnehmen
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button
              onClick={scrollToContact}
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Calendar Embed (Placeholder)
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

