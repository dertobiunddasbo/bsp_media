import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der bsp media GmbH - Angaben gemäß § 5 TMG',
  robots: {
    index: true,
    follow: false,
  },
}

export default function Impressum() {
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

        <h1 className="text-5xl font-semibold text-dark mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-600 font-extralight leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              bsp media GmbH
              <br />
              Sillemstrasse 76a
              <br />
              D-20257 Hamburg
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4940607713440" className="text-accent hover:underline">+49 (0)40 60 77 134 - 40</a>
              <br />
              Fax: +49 (0)40 60 77 134 - 50
              <br />
              E-Mail: <a href="mailto:hallo@bsp-media.de" className="text-accent hover:underline">hallo@bsp-media.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Registereintrag</h2>
            <p>
              Sitz: Hamburg
              <br />
              Amtsgericht Hamburg
              <br />
              Handelsregister Nummer: HRB103025
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              DE 256831599
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Geschäftsführer</h2>
            <p>
              Jobst von Paepcke
              <br />
              Florian Gebbert
              <br />
              Tobias Abt
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Jobst von Paepcke, Florian Gebbert, Tobias Abt
              <br />
              bsp media GmbH
              <br />
              Sillemstrasse 76a
              <br />
              D-20257 Hamburg
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
    <Footer />
    </>
  )
}

