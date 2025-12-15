import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Portfolio() {
  const cases = [
    {
      id: 'aldi-sued-supplier-portraits',
      title: 'ALDI SÜD Supplier Portraits',
      category: 'Corporate',
      description: 'Einfühlsame Portraitfilme, die die Menschen hinter den Produkten sichtbar machen. Authentische Einblicke in Produktion, Werte und tägliche Abläufe.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'ALDI SÜD',
    },
    {
      id: 'apoprojekt-employer-branding',
      title: 'apoprojekt & Du',
      category: 'Employer Branding',
      description: 'Authentische Mitarbeiterportraits an allen deutschen Standorten. Filme, die Menschen, Rollen und Arbeitskultur unmittelbar erlebbar machen.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'apoprojekt',
    },
    {
      id: 'zal-innovation-days',
      title: 'ZAL Innovation Days',
      category: 'Event/Kongressfilm',
      description: 'Dynamische Eventdokumentation eines zweitägigen Kongresses. Panels, Workshops, Ausstellungen und Networking-Momente aus nächster Nähe.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'ZAL',
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
              Unsere Projekte
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold text-dark mb-8 tracking-tight">
              Portfolio
            </h1>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto font-extralight leading-relaxed">
              Einblicke in unsere Filmproduktionen und visuellen Kommunikationslösungen
            </p>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {cases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/portfolio/${caseItem.id}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-dark mb-3 group-hover:text-accent transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-dark/70 text-sm font-extralight leading-relaxed mb-4">
                    {caseItem.description}
                  </p>
                  <div className="flex items-center text-accent font-light text-sm">
                    <span>Mehr erfahren</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

