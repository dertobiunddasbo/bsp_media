import type { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Termin vereinbaren',
  description: 'Vereinbaren Sie einen Termin mit der bsp media GmbH für ein persönliches Gespräch über Ihr Projekt.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Termin() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-semibold text-dark mb-4">Termin vereinbaren</h1>
            <p className="text-xl text-dark/70 mb-8 font-extralight max-w-2xl mx-auto">
              Wählen Sie einen passenden Termin für ein persönliches Gespräch über Ihr Projekt. Wir freuen uns auf den Austausch mit Ihnen.
            </p>
          </div>

          {/* Google Calendar Appointment Scheduling */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/appointments/AcZssZ0TgmgttHE2Yauh2Mpj7GFdlFnIx_QluTZ5GfQ=?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              className="w-full"
              title="Terminbuchung"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-dark/60 font-extralight text-sm">
              Alternativ können Sie uns auch direkt{' '}
              <a href="/kontakt" className="text-accent hover:underline">
                kontaktieren
              </a>
              {' '}oder eine{' '}
              <a href="mailto:hallo@bsp-media.de" className="text-accent hover:underline">
                E-Mail
              </a>
              {' '}senden.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
