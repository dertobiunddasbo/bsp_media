'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Dark gradient from bottom for text readability */}
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
        <div className="text-white animate-slide-up text-center">
          <div className="inline-block mb-8 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
            Filmproduktion Hamburg
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.05] tracking-tight max-w-6xl mx-auto">
            High-End Kommunikation für die operative Realität.
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -z-10" />
            <p className="text-xl sm:text-2xl text-white mb-16 leading-relaxed font-light p-6 relative z-10">
              Wir bringen Ihre Strategie dorthin, wo keine E-Mails gelesen werden. Die Produktionspartner für Konzerne mit komplexen Strukturen. Schnell, diskret und broadcast-ready.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Verfügbarkeit prüfen
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
  )
}

