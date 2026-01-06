'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/sections/Hero'

function StartupsPageContent() {
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
      <Hero pageSlug="startups" />
      
      {/* Hero Section - REMOVED, using Hero above */}
      <section
        id="hero-old"
        className="hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
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
              Filmproduktion für Startups
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.05] tracking-tight text-white">
              Scale faster. Stand out.
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />
              <p className="text-xl sm:text-2xl text-white mb-16 leading-relaxed font-light max-w-3xl mx-auto p-6 relative z-10">
                Professionelle Videos, die Investoren überzeugen und Kunden gewinnen. Schnell, skalierbar, ohne Agentur-Komplexität.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Pitch deck besprechen
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
              Warum Startups zu uns kommen
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Speed über alles
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Sie haben keine Zeit für 6-Wochen-Prozesse. Wir liefern Pitch-Videos in Tagen, nicht Wochen. Flexibel, agil, startup-tauglich.
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
                Fair, transparent, skalierbar
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Keine versteckten Kosten, keine Agentur-Overheads. Sie zahlen nur, was Sie brauchen. Festpreise, die in Seed- und Series-A-Budgets passen.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-pink-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                Investor-ready Content
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Wir verstehen, was VCs sehen wollen. Professionelle Pitch-Videos, Produkt-Demos und Founder-Stories, die Ihre Vision überzeugend erzählen.
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
                    Festpreise, die passen
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-lg">
                    Transparente Preise, die zu Startup-Budgets passen. Keine Agentur-Overheads, keine versteckten Kosten.
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
                    Schnelle Entscheidungen brauchen schnelle Antworten. Innerhalb eines Werktages erhalten Sie ein klares, detailliertes Angebot.
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
              Was Startups wirklich brauchen
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
              Content, der skalierbar ist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Pitch Videos"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Pitch Videos & Investor Content
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Überzeugen Sie Investoren mit professionellen Pitch-Videos, Founder-Stories und Produkt-Demos. Investor-ready in Tagen.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Product Demos"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Product Demos & Launch Content
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Zeigen Sie, was Ihr Produkt kann. Hochwertige Demos, Launch-Videos und Tutorials, die Nutzer begeistern und konvertieren.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Social Media & Growth"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  Social Media & Growth
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Skalierbare Content-Produktion für LinkedIn, Instagram, TikTok. Aus einem Drehtag Content für Wochen – perfekt für Growth Teams.
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
                Let's talk. Fast.
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Kein Sales-Pitch. Eine schnelle, ehrliche Einschätzung zu Budget und Machbarkeit. Angebot innerhalb von 24h.
              </p>
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

export default function StartupsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wird geladen...</div>}>
      <StartupsPageContent />
    </Suspense>
  )
}

