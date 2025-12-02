import Link from 'next/link'

export default function Impressum() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-dark hover:text-accent transition-colors mb-8 font-light"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="text-5xl font-semibold text-dark mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-dark/70 font-extralight leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              bsp media GmbH
              <br />
              Sillemstraße 76a
              <br />
              20257 Hamburg
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Kontakt</h2>
            <p>
              Telefon: [Telefonnummer]
              <br />
              E-Mail: <a href="mailto:hallo@bsp-media.de" className="text-accent hover:underline">hallo@bsp-media.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.
              <br />
              Registergericht: [Registergericht]
              <br />
              Registernummer: [Registernummer]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              [USt-IdNr.]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              [Name des Geschäftsführers]
              <br />
              bsp media GmbH
              <br />
              Sillemstraße 76a
              <br />
              20257 Hamburg
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

