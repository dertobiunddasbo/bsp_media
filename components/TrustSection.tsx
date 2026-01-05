export default function TrustSection() {
  const clients = [
    { name: 'VW Nutzfahrzeuge', logo: '/assets/VWN_Logo_grau.png' },
    { name: 'ALDI SÜD', logo: '/assets/ALDISÜD_Logo_grau.png' },
    { name: 'Vodafone', logo: '/assets/Vodafone_Logo_grau.png' },
    { name: 'Flughafen Hamburg', logo: '/assets/Airport_Logo_grau.png' },
    { name: 'ZAL Zentrum für Angewandte Luftfahrtforschung', logo: '/assets/ZAL_Logo_grau.png' },
    { name: 'Paypal', logo: '/assets/Paypal_Logo_grau.png' },
    { name: 'Ford', logo: '/assets/Ford_Logo_grau.png' },
    { name: 'BVG', logo: '/assets/BVG_Logo_grau.png' },
    { name: 'apoprojekt', logo: '/assets/apoprojekt_Logo_grau.png' },
    { name: 'Children for a better World e.V.', logo: '/assets/Children_Logo_grau.png' },
  ]

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <p className="text-center text-base md:text-lg text-slate-900 mb-8 uppercase tracking-wider font-semibold">
          Vertrauen durch Erfahrung in Industrie, Luftfahrt und Öffentlichkeit.
        </p>
        <p className="text-center text-sm md:text-base text-slate-600 mb-16 font-light italic">
          Erfahren in der Zusammenarbeit mit Betriebsräten, Vorständen und Sicherheitsabteilungen in Hochsicherheitsbereichen.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="aspect-[3/2] bg-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity border border-gray-200 p-4"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

