'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/sections/Hero'
import Link from 'next/link'

function NonProfitPageContent() {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const content = (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero pageSlug="non-profit" />
      
      {/* Hero Section - REMOVED, using Hero above */}
      <section
        id="hero-old"
        className="hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
              Filmproduktion für Non-Profits
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.05] tracking-tight text-white">
              Geschichten, die bewegen.
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />
              <p className="text-xl sm:text-2xl text-white mb-16 leading-relaxed font-light max-w-3xl mx-auto p-6 relative z-10">
                Professionelle Filmproduktion für Stiftungen, Vereine und soziale Organisationen. Emotionale Geschichten, die Spender gewinnen und Botschaften transportieren.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Projekt besprechen
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
              Warum Non-Profits zu uns kommen
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Emotionen, die überzeugen
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Wir erzählen die Geschichten hinter Ihrer Mission. Authentisch, respektvoll, mit emotionaler Tiefe – so, dass Menschen berührt werden und handeln.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Faire Preise für den guten Zweck
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Wir verstehen begrenzte Budgets. Transparente Festpreise, die zu Non-Profit-Haushalten passen. Jeder Euro zählt – wir machen jeden zählen.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Impact, der zählt
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Videos, die Spender gewinnen, Ehrenamtliche mobilisieren und Aufmerksamkeit schaffen. Content, der Ihre Mission voranbringt – nicht nur schön aussieht.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Speed Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-10 border-2 border-gray-200 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                    Faire Festpreise
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-lg">
                    Transparente Preise, die zu Non-Profit-Budgets passen. Keine Agentur-Overheads. Jeder Euro zählt – wir machen ihn zählen.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-10 border-2 border-gray-200 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                    Angebot in 24h
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-lg">
                    Schnelle Antworten für schnelle Entscheidungen. Innerhalb eines Werktages erhalten Sie ein klares, detailliertes Angebot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
              Kommunikation für den guten Zweck
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
              Videos, die Ihre Mission voranbringen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fundraising & Spendenkampagnen"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Fundraising & Spendenkampagnen
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Emotionale Geschichten, die Spender gewinnen. Impact-Videos, die zeigen, was mit Spenden möglich ist. Authentisch, respektvoll, überzeugend.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Aufklärungs- & Awareness-Kampagnen"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Aufklärungs- & Awareness-Kampagnen
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Komplexe Themen einfach erklärt. Videos, die Aufmerksamkeit schaffen und zum Handeln bewegen. Für Social Media, Events und Öffentlichkeitsarbeit.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Recruiting & Ehrenamt"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Recruiting & Ehrenamt
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Zeigen Sie, warum Menschen für Ihre Sache brennen. Videos, die neue Mitarbeiter gewinnen und Ehrenamtliche motivieren. Authentisch und inspirierend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                Lassen Sie uns über Ihre Mission sprechen.
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                Kein Sales-Pitch. Eine ehrliche Einschätzung, wie wir Ihre Geschichte erzählen können. Angebot innerhalb von 24h.
              </p>
              
              {/* Direct Terminbuchung CTA */}
              <div className="mb-12">
                <Link
                  href="/termin"
                  className="inline-block bg-accent text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
                >
                  📅 Direkt Termin vereinbaren
                </Link>
                <p className="text-gray-400 text-sm font-light mt-3">
                  Oder nutzen Sie das Kontaktformular
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

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

export default function NonProfitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wird geladen...</div>}>
      <NonProfitPageContent />
    </Suspense>
  )
}

