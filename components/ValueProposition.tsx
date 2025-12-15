export default function ValueProposition() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Partner auf Augenhöhe',
      description: 'Wir verstehen nicht nur Briefings, sondern Ihre Situation. Ob Vorstand oder Fachabteilung – wir sprechen Ihre Sprache und denken für Sie mit.',
      gradient: 'from-accent to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Qualität, die überzeugt',
      description: 'Kein "Schema F", sondern maßgeschneiderte Lösungen. Wir sorgen dafür, dass Ihre Botschaft nicht nur gesendet, sondern auch gefühlt und verstanden wird.',
      gradient: 'from-accent to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Verlässlichkeit als Prinzip',
      description: 'Wir wissen, dass Budgets und Deadlines heilig sind. Bei uns bekommen Sie kreativen Freiraum in einem sicheren Rahmen.',
      gradient: 'from-accent to-pink-600',
    },
  ]

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            Unsere Werte
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-10 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {value.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-slate-900 mb-6 group-hover:text-accent transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-extralight">
                {value.description}
              </p>

              {/* Decorative Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

