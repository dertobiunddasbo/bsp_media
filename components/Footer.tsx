import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Adresse */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="BSP MEDIA"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 font-extralight leading-relaxed">
              bsp media GmbH<br />
              Sillemstraße 76a<br />
              20257 Hamburg
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Kontakt</h3>
            <div className="space-y-3">
              <a
                href="mailto:hallo@bsp-media.de"
                className="block text-gray-400 hover:text-accent transition-colors font-extralight"
              >
                hallo@bsp-media.de
              </a>
            </div>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
            <div className="space-y-3">
              <Link
                href="/impressum"
                className="block text-gray-400 hover:text-accent transition-colors font-extralight"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="block text-gray-400 hover:text-accent transition-colors font-extralight"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="block text-gray-400 hover:text-accent transition-colors font-extralight"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm font-extralight">
          © 2025 bsp media GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}

