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
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <p className="text-center text-base md:text-lg text-slate-900 mb-16 uppercase tracking-wider font-semibold">
          Vertrauen durch Erfahrung in Industrie, Luftfahrt und Öffentlichkeit.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="aspect-[3/2] bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <span className="text-slate-700 text-xs font-bold uppercase text-center px-3 opacity-60">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

