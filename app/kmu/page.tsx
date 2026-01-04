'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function KMUPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
              Filmproduktion für KMU
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.05] tracking-tight text-white">
              Großes Kino für KMU.
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />
              <p className="text-xl sm:text-2xl text-white mb-16 leading-relaxed font-light max-w-3xl mx-auto p-6 relative z-10">
                Professionelle Filmproduktion für Hidden Champions und Macher. Ohne Agentur-Overhead. Direkt, nordisch, hochwertig.
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

        {/* Scroll Indicator */}
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
              Warum wir?
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
                Verstehen statt verkaufen
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Wir brauchen kein 50-seitiges Briefing. Wir verstehen Ihre Prozesse, Ihre Maschinen und Ihre Kultur. Wir kommen, drehen und liefern.
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
                High-End Technik, Lean Team
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Sie bekommen die Bildqualität unserer Konzern-Kunden, aber mit einer internen, professionellen Crew, die Ihren Betriebsablauf nicht lahmlegt.
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
                Werte schaffen
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg font-light">
                Kein Content für die Schublade. Wir produzieren Filme, die neue Mitarbeiter überzeugen und Kunden gewinnen, ob für die Website oder Social Media.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Adapted Services Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
              Was KMU wirklich brauchen
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
              Pragmatische Lösungen, die wirklich wirken
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
                  Employer Branding & Recruiting
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Der Kampf um Fachkräfte wird mit Emotionen gewonnen. Wir porträtieren Ihr Team authentisch. Keine Schauspielerei, echte Werte.
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
                  Image & Produkt
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Zeigen Sie, was Sie leisten. Hochwertige Aufnahmen Ihrer Fertigung, Referenzprojekte oder Dienstleistungen. Perfekt für Website und Messe.
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
                  Social Media & LinkedIn
                </h3>
                <p className="text-slate-700 leading-relaxed font-light">
                  Sichtbarkeit entscheidet. Wir schneiden aus einem Drehtag Content für Wochen. Für einen Kanal, der lebt.
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
              Vertraut von Machern
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Hidden Champions und Macher, die auf Qualität setzen
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
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Kein Sales-Pitch. Eine ehrliche Einschätzung zu Budget und Machbarkeit.
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
}

