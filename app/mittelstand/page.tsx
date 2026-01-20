'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/sections/Hero'
// import Testimonials from '@/components/sections/Testimonials' // TODO: Später wieder einbauen
import FAQ from '@/components/sections/FAQ'
import Link from 'next/link'

function MittelstandPageContent() {
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
      <Hero pageSlug="mittelstand" />

      {/* Value Proposition Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
              Transformation Ihrer Kommunikation
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Point 1 */}
            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Imagefilm & Positionierung
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Professionelle Imagefilme, die Ihre Unternehmenswerte und Ihre Positionierung klar kommunizieren. Maßgeschneidert für Ihre Branche und Ihre Zielgruppe.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Point 2 */}
            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Employer Branding & Recruiting
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Der Kampf um Fachkräfte wird mit Emotionen gewonnen. Wir porträtieren Ihr Team authentisch und zeigen, was Ihr Unternehmen ausmacht. Keine Schauspielerei, echte Werte.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Point 3 */}
            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Alle Kanäle, eine Strategie
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Website, Social Media, LinkedIn, Messe – wir bespielen alle Kanäle mit konsistenter Botschaft. Aus einem Drehtag Content für Wochen. Transformation Ihrer Kommunikation in eine neue Phase.
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
            {/* Festpreis */}
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
                    Wir arbeiten zum Festpreis
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-lg">
                    Keine versteckten Kosten, keine Überraschungen. Sie wissen von Anfang an, was Sie investieren. Transparent und fair.
                  </p>
                </div>
              </div>
            </div>

            {/* 24h Angebot */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-10 border-2 border-gray-200 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                    Angebot innerhalb von 24h
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-lg">
                    Schnelle Entscheidungen brauchen schnelle Antworten. Innerhalb eines Werktages erhalten Sie ein klares, detailliertes Angebot.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-accent text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Jetzt direkt Angebot anfordern</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adapted Services Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
              Maßgeschneiderte Lösungen für den Mittelstand
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
              Individuelle Lösungen, branchenabhängig und auf Ihre Bedürfnisse zugeschnitten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Service 1 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Employer Branding & Recruiting"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Imagefilm & Positionierung
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Professionelle Imagefilme, die Ihre Unternehmenswerte und Ihre Positionierung klar kommunizieren. Maßgeschneidert für Ihre Branche.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Image & Produkt"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Employer Branding & Recruiting
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Der Kampf um Fachkräfte wird mit Emotionen gewonnen. Wir porträtieren Ihr Team authentisch und zeigen, was Ihr Unternehmen ausmacht.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Social Media & LinkedIn"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Multi-Channel Content
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Website, Social Media, LinkedIn, Messe – wir bespielen alle Kanäle mit konsistenter Botschaft. Aus einem Drehtag Content für Wochen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
              Vertraut vom Mittelstand
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Hidden Champions und mittelständische Unternehmen, die auf Qualität setzen
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {['apoprojekt', 'TSF Fehmarn', 'Naturland', 'Dethleffs'].map((client, index) => (
              <div
                key={index}
                className="aspect-[3/2] bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
              >
                <span className="text-slate-700 text-xs font-bold uppercase text-center px-3 opacity-60">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                Lassen Sie uns einfach sprechen.
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                Kein Sales-Pitch. Eine ehrliche Einschätzung zu Budget, Machbarkeit und der Transformation Ihrer Kommunikation.
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

      {/* <Testimonials pageSlug="mittelstand" /> */} {/* TODO: Später wieder einbauen */}
      <FAQ pageSlug="mittelstand" />

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

export default function MittelstandPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wird geladen...</div>}>
      <MittelstandPageContent />
    </Suspense>
  )
}

