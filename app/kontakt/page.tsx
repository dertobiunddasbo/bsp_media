import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

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

          <div className="grid md:grid-cols-2 gap-12">
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
        </div>
      </main>
      <Footer />
    </>
  )
}

