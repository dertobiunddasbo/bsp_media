export default function NDADisclaimer() {
  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-5 py-2 bg-accent/10 rounded-full text-sm font-light text-accent border border-accent/20">
            Vertrauen & Sicherheit
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight">
            Ein geschützter Raum
            <br />
            <span className="text-accent">für Ihre Themen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* Diskretion */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Diskretion
            </h3>
            <p className="text-gray-300 leading-relaxed font-light">
              Viele unserer Projekte behandeln sensible interne Themen. Wir bitten um Verständnis, dass wir diese Arbeiten nicht öffentlich zeigen. Diskretion ist Teil unseres Qualitätsversprechens.
            </p>
          </div>

          {/* DSGVO */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              DSGVO-konform
            </h3>
            <p className="text-gray-300 leading-relaxed font-light">
              Wir behandeln alle Daten und Inhalte nach höchsten Datenschutzstandards. Unsere Prozesse sind DSGVO-konform und wir arbeiten mit klaren Vereinbarungen zur Datenverarbeitung.
            </p>
          </div>

          {/* Vertrauen */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Vertrauen
            </h3>
            <p className="text-gray-300 leading-relaxed font-light">
              Langjährige Partnerschaften mit Unternehmen aus Industrie, Luftfahrt und Öffentlichkeit zeigen: Sie können sich auf unsere Zuverlässigkeit und Vertraulichkeit verlassen.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-400 text-sm font-light">
            Haben Sie Fragen zu Datenschutz oder Vertraulichkeit?{' '}
            <a href="/kontakt" className="text-accent hover:text-accent/80 underline transition-colors">
              Sprechen Sie uns an
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

