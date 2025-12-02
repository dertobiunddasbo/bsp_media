export default function Leistungen() {
  const services = [
    {
      title: 'Recruiting & Kultur',
      description: 'Fachkräfte gewinnt man heute mit Ehrlichkeit. Wir helfen Ihnen, Ihre Unternehmenskultur so zu zeigen, dass die richtigen Menschen "Ja" sagen.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Corporate Storytelling',
      description: 'Zahlen und Fakten sind wichtig. Aber Geschichten bleiben im Kopf. Wir verwandeln Ihre Geschäftsberichte und Strategien in Filme, die man gerne schaut.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Interne Kommunikation',
      description: 'Veränderung braucht Verständnis. Wir produzieren Formate, die Ihre Mitarbeitenden mitnehmen, statt sie nur zu informieren.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Wissen & E-Learning',
      description: 'Komplexe Inhalte, einfach erklärt. Wir bereiten das Wissen Ihrer Experten so auf, dass Lernen Spaß macht und hängen bleibt.',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
  ]

  return (
    <section id="leistungen" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
            Was wir bieten
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-extralight leading-relaxed">
            Professionelle audiovisuelle Lösungen für Ihr Unternehmen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-extralight">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

