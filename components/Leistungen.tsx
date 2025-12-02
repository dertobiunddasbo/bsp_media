export default function Leistungen() {
  const services = [
    {
      title: 'Corporate Communication & Image',
      description: 'Statement-Videos, klassische Imagefilme und PR-Material. Wir übersetzen Ihre Unternehmenswerte in bewegte Bilder – CI-konform und authentisch.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Employer Branding & Recruiting',
      description: 'Fachkräfte gewinnen mit authentischen Recruiting-Videos. Wir zeigen Ihre Unternehmenskultur, Arbeitsplätze und Teams so, dass die richtigen Talente sich angesprochen fühlen.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Interne Kommunikation & Education',
      description: 'Wissenstransfer, der ankommt. Wir konzipieren interaktive Education-Formate, E-Learning-Module und Schulungsvideos für Ihre Belegschaft.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Animation & Erklärfilm',
      description: 'Komplexe Prozesse einfach dargestellt. Ob 2D-Animation oder Motion Graphics: Wir visualisieren Dienstleistungen und Produkte so, dass sie jeder versteht.',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Events & Internationalisierung',
      description: 'Von der Event-Dokumentation bis zur globalen Kampagne. Wir begleiten Ihre Messen und sorgen mit Übersetzungen und Voice-Overs für den weltweiten Einsatz Ihres Contents.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
    {
      title: 'Livestreams',
      description: 'Professionelle Live-Übertragungen für Ihre Events, Konferenzen und Produktpräsentationen. Multi-Kamera-Setup, professionelle Regie und zuverlässige Technik für Ihre Live-Kommunikation.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
  ]

  return (
    <section id="leistungen" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-gray-100 rounded-full text-sm font-light text-slate-700">
            Was wir bieten
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-extralight">
            Professionelle audiovisuelle Lösungen für Ihr Unternehmen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-accent transition-colors">
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

