import type { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie die bsp media GmbH für Ihre Filmproduktion, Corporate Video oder E-Learning Projekte. Wir freuen uns auf Ihre Nachricht.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Kontakt() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-semibold text-dark mb-4">Kontakt</h1>
          <p className="text-xl text-dark/70 mb-12 font-extralight">
            Haben Sie Fragen oder ein Projekt im Kopf? Wir freuen uns auf Ihre Nachricht.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Kontaktinformationen */}
            <div>
              <h2 className="text-2xl font-semibold text-dark mb-6">Kontaktinformationen</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-dark mb-2">Adresse</h3>
                  <p className="text-dark/70 font-extralight">
                    bsp media GmbH<br />
                    Sillemstraße 76a<br />
                    20257 Hamburg
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">E-Mail</h3>
                  <a
                    href="mailto:hallo@bsp-media.de"
                    className="text-accent hover:underline font-extralight"
                  >
                    hallo@bsp-media.de
                  </a>
                </div>
              </div>
            </div>

            {/* Kontaktformular */}
            <div>
              <ContactForm />
            </div>
          </div>

          {/* Terminbuchung Option */}
          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-dark mb-4">Oder vereinbaren Sie direkt einen Termin</h2>
            <p className="text-dark/70 font-extralight mb-6 max-w-2xl mx-auto">
              Wählen Sie einen passenden Termin für ein persönliches Gespräch über Ihr Projekt.
            </p>
            <a
              href="/termin"
              className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Termin vereinbaren
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

