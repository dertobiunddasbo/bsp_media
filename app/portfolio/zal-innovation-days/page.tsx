import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ZalCase() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark/90 z-10" />
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="ZAL Innovation Days"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <div className="inline-block mb-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full text-sm font-light">
                Event/Kongressfilm
              </div>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">
                ZAL Innovation Days
              </h1>
              <p className="text-xl md:text-2xl font-extralight text-white/90">
                Dynamische Eventdokumentation eines Innovationskongresses
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center text-accent hover:text-accent/80 font-light mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück zum Portfolio
          </Link>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-xl text-dark/80 font-extralight leading-relaxed mb-6">
              Die ZAL – das Zentrum für Angewandte Luftfahrtforschung und Hamburgs Innovationshub für die Luftfahrt – veranstaltete die Innovation Days, die wir in einer dynamischen Eventdokumentation festgehalten haben. Mit zwei Kamerateams begleiteten wir den zweitägigen Kongress, hielten Panels, Workshops, Ausstellungen und Networking-Momente aus nächster Nähe fest und fingen die Innovationskraft der Veranstaltung ein.
            </p>
            <p className="text-xl text-dark/80 font-extralight leading-relaxed mb-6">
              Durch schnelle Bildsprache, authentische O-Töne und starke visuelle Eindrücke entsteht ein kompakter Eventfilm, der die Vielfalt der Themen ebenso zeigt wie die Energie der Teilnehmenden. Das Ergebnis dient ZAL als wirkungsstarkes Kommunikationsmittel, um Reichweite zu erhöhen und die Bedeutung des Innovationsstandorts Hamburg sichtbar zu machen.
            </p>
          </div>

          {/* Videos Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-dark mb-8">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1 - Placeholder */}
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 font-light">Video 1</p>
                    <p className="text-sm text-gray-400 font-extralight">Eventfilm</p>
                  </div>
                </div>
              </div>

              {/* Video 2 - Placeholder */}
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 font-light">Video 2</p>
                    <p className="text-sm text-gray-400 font-extralight">Highlights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div>
            <h2 className="text-3xl font-semibold text-dark mb-8">Fotos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Photo 1 - Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Photo 2 - Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Photo 3 - Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Photo 4 - Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Photo 5 - Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

