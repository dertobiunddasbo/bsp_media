import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der bsp media GmbH - Informationen zum Umgang mit personenbezogenen Daten',
  robots: {
    index: true,
    follow: false,
  },
}

export default function Datenschutz() {
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

        <h1 className="text-5xl font-semibold text-dark mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-dark/70 font-extralight leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">1. Datenschutz auf einen Blick</h2>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Datenerfassung auf dieser Website</h3>
            <p>
              <strong className="font-semibold text-dark">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong> Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">2. Hosting</h2>
            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Vercel</h3>
            <p>
              Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wir haben mit Vercel einen Vertrag über Auftragsverarbeitung (AVV) auf Basis der EU-Standardvertragsklauseln geschlossen. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren Websitebereitstellung).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              bsp media GmbH<br />
              Sillemstraße 76a<br />
              20257 Hamburg
            </p>
            <p>
              E-Mail: <a href="mailto:hallo@bsp-media.de" className="text-accent hover:underline">hallo@bsp-media.de</a><br />
              Telefon: <a href="tel:+4940607713440" className="text-accent hover:underline">040 60 77 134 - 40</a>
            </p>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Speicherdauer</h3>
            <p>
              Soweit keine speziellere Speicherdauer genannt wurde, verbleiben Ihre Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt oder Sie Ihre Einwilligung widerrufen (sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt automatisch Informationen in Server-Log-Dateien (u.a. IP-Adresse, Browsertyp, Uhrzeit). Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Kontaktformular</h3>
            <p>
              Anfragen via Formular werden zwecks Bearbeitung gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">5. Analyse-Tools und Werbung</h2>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Cookie-Einwilligung (Consent-Banner)</h3>
            <p>
              Beim ersten Besuch dieser Website erscheint ein Hinweis zur Cookie-Nutzung. Eine Speicherung von Analyse- oder Marketing-Cookies (z. B. Google Analytics) erfolgt erst, wenn Sie auf „Alle akzeptieren" klicken. Mit „Nur notwendige" werden ausschließlich technisch erforderliche Cookies gesetzt. Ihre Wahl speichern wir lokal im Browser (localStorage), damit der Hinweis nicht bei jedem Besuch erneut erscheint. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die gespeicherte Einstellung in Ihrem Browser löschen und die Seite neu laden – der Hinweis erscheint erneut und Sie können erneut wählen. Dies entspricht den Anforderungen von DSGVO und § 25 TDDDG (vorherige Einwilligung, einfache Ablehnung möglich).
            </p>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Google Analytics</h3>
            <p>
              Diese Website nutzt Google Analytics 4 (GA4) mit Google Consent Mode v2. Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland. Es werden erst dann Analyse-Cookies bzw. -daten gesetzt bzw. übermittelt, wenn Sie im Cookie-Banner auf „Alle akzeptieren" geklickt haben (Opt-in). Ohne diese Einwilligung erfolgt kein Tracking.
            </p>
            <p>
              Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar (siehe Cookie-Einwilligung oben). Wir nutzen IP-Anonymisierung; mit Google besteht ein Vertrag zur Auftragsverarbeitung.
            </p>

            <h3 className="text-xl font-semibold text-dark mb-3 mt-6">Google Search Console</h3>
            <p>
              Wir nutzen die Google Search Console, um die Leistung unserer Website in den Suchergebnissen von Google zu überwachen und zu optimieren. Dabei werden keine personenbezogenen Daten von Websitebesuchern durch uns gespeichert, es werden jedoch statistische Daten über die Nutzung unserer Website durch Google verarbeitet, um uns Berichte zur Verfügung zu stellen. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Optimierung unseres Online-Angebots).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auskunft, Berichtigung und Löschung Ihrer Daten.</li>
              <li>Einschränkung der Verarbeitung und Datenübertragbarkeit.</li>
              <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO).</li>
              <li>Beschwerde bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO).</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

