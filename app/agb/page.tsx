import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen (AGB) der bsp media GmbH',
  robots: {
    index: true,
    follow: false,
  },
}

export default function AGB() {
  return (
    <>
      <Header />
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

        <h1 className="text-5xl font-semibold text-dark mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-dark/70 font-extralight leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der bsp media GmbH (nachfolgend "Auftragnehmer") und ihren Kunden (nachfolgend "Auftraggeber") über die Erbringung von Dienstleistungen im Bereich der audiovisuellen Medienproduktion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">2. Vertragsgegenstand</h2>
            <p>
              Der Auftragnehmer erbringt Dienstleistungen im Bereich der Film- und Videoproduktion, Animation, Postproduktion sowie verwandter audiovisueller Dienstleistungen. Der genaue Umfang der Leistungen ergibt sich aus der jeweiligen Auftragsbestätigung oder dem schriftlichen Vertrag.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">3. Angebot und Vertragsabschluss</h2>
            <p>
              Alle Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch die Ausführung des Auftrags zustande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">4. Preise und Zahlungsbedingungen</h2>
            <p>
              Alle Preise verstehen sich in Euro zuzüglich der gesetzlichen Mehrwertsteuer. Sofern nicht anders vereinbart, sind die Preise innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">5. Leistungserbringung</h2>
            <p>
              Der Auftragnehmer verpflichtet sich, die vereinbarten Leistungen sorgfältig und nach den anerkannten Regeln der Technik zu erbringen. Termine und Fristen sind nur dann verbindlich, wenn sie schriftlich bestätigt wurden. Der Auftragnehmer ist berechtigt, Teilleistungen zu erbringen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">6. Rechte des Auftraggebers</h2>
            <p>
              Der Auftraggeber hat das Recht, die erbrachten Leistungen zu prüfen und Mängel zu rügen. Mängel sind unverzüglich schriftlich mitzuteilen. Werden Mängel nicht rechtzeitig gerügt, gelten die Leistungen als genehmigt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">7. Urheberrechte</h2>
            <p>
              Die Urheberrechte an den vom Auftragnehmer erstellten Werken verbleiben beim Auftragnehmer, sofern nicht ausdrücklich etwas anderes vereinbart wurde. Der Auftraggeber erhält eine Nutzungslizenz entsprechend dem vereinbarten Nutzungsumfang.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">8. Haftung</h2>
            <p>
              Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung einer wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">9. Datenschutz</h2>
            <p>
              Der Auftragnehmer verpflichtet sich, alle personenbezogenen Daten des Auftraggebers vertraulich zu behandeln und die Bestimmungen der DSGVO einzuhalten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">10. Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Hamburg, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

