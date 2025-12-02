export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6 px-4 py-1.5 bg-accent/10 rounded-full text-sm font-light text-accent border border-accent/20">
              Über uns
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 leading-tight tracking-tight">
              Kreative Exzellenz
              <br />
              <span className="text-accent">
                trifft Prozesssicherheit.
              </span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-extralight">
              <p>
                Als <span className="font-light text-slate-900">bsp media GmbH</span> kennen wir die Anforderungen anspruchsvoller Branchen – von der Luftfahrtforschung bis zum öffentlichen Sektor. Wir wissen, was Sicherheitsvorgaben, Compliance und Datenschutz bedeuten.
              </p>
              <p>
                Wir verbinden die kreative Kraft unserer Wurzeln mit der Verlässlichkeit, die Sie für Ausschreibungen und Großprojekte benötigen. <span className="font-light text-slate-900">International tätig und mehrsprachig</span> – wir produzieren für Konzerne weltweit und sorgen mit professionellen Übersetzungen und Voice-Overs für den globalen Einsatz Ihrer Kommunikation.
              </p>
            </div>

            {/* Stats or Features */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-gray-600 font-extralight">Jahre Erfahrung</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-gray-600 font-extralight">Projekte</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-gray-600 font-extralight">Deadline-Treue</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                alt="Professionelle Filmproduktion"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Hamburg</div>
                      <div className="text-sm text-gray-600 font-extralight">International</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/30 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

