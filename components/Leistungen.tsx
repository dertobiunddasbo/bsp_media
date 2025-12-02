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
    {
      title: 'Fotografie',
      description: 'Professionelle Corporate-Fotografie für Ihre Kommunikation. Von Porträts über Produktfotografie bis hin zur Event-Dokumentation – wir liefern hochwertige Bilder für alle Ihre Kanäle.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-accent to-pink-600',
    },
  ]

  return (
    <section id="leistungen" className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1.5 bg-gray-100 rounded-full text-sm font-light text-dark">
            Was wir bieten
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold text-dark mb-6 tracking-tight">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-dark/70 max-w-2xl mx-auto font-extralight">
            Professionelle audiovisuelle Lösungen für Ihr Unternehmen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="absolute top-0 left-8 w-12 h-1 bg-accent rounded-full" />
                <h3 className="text-3xl font-semibold text-dark mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark/70 leading-relaxed text-lg font-extralight">
                  {service.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-6 flex items-center text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Mehr erfahren
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

