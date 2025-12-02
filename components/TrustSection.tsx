export default function TrustSection() {
  const clients = [
    'VW Nutzfahrzeuge',
    'ALDI SÜD',
    'Vodafone',
    'Flughafen Hamburg',
    'ZAL Zentrum für Angewandte Luftfahrtforschung',
    'Paypal',
    'Ford',
    'BVG',
    'apoprojekt',
    'Children for a better World e.V.',
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-dark mb-10 uppercase tracking-wider font-light">
          Vertrauen durch Erfahrung in Industrie, Luftfahrt und Öffentlichkeit.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="w-32 h-16 md:w-40 md:h-20 bg-gray-200 opacity-40 rounded flex items-center justify-center hover:opacity-60 transition-opacity"
            >
              <span className="text-dark text-xs font-light text-center px-2">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

