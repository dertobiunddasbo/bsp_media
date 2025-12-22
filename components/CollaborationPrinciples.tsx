export default function CollaborationPrinciples() {
  const principles = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Offener und partnerschaftlicher Austausch auf Augenhöhe',
      description: 'Wir verstehen uns als Partner*innen, die mit Ihnen gemeinsam Lösungen entwickeln. Transparenz und gegenseitiges Vertrauen bilden die Basis für erfolgreiche Projekte.',
      gradient: 'from-accent to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Proaktive Kommunikation und Beratung',
      description: 'Wir beraten und informieren proaktiv hinsichtlich Konzeption, Umsetzung und Optimierung. Wir weisen Sie frühzeitig auf Herausforderungen hin und bringen konstruktive Lösungsvorschläge ein.',
      gradient: 'from-accent to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Effiziente Prozesse und konkrete Ansprechpartner:innen',
      description: 'Bei uns finden Sie klare Ansprechpartner:innen und keine langwierigen E-Mail-Verteiler. Jeder Auftrag hat einen konkreten Ansprechpartner für Kommunikation, Planung, Umsetzung und Optimierung.',
      gradient: 'from-accent to-pink-600',
    },
  ]

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-12 tracking-tight">
            Das ist uns wichtig:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${principle.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {principle.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">
                {principle.title}
              </h3>
              <p className="text-slate-800 leading-relaxed text-base font-light">
                {principle.description}
              </p>

              {/* Decorative Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${principle.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
