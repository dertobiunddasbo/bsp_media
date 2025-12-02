export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Adresse */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Adresse</h3>
            <p className="text-white/70 font-extralight">
              Sillemstraße 76a<br />
              20257 Hamburg
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Kontakt</h3>
            <a
              href="mailto:hallo@bsp-media.de"
              className="text-white/70 hover:text-accent transition-colors font-extralight"
            >
              hallo@bsp-media.de
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
            <div className="space-y-2">
              <a
                href="/impressum"
                className="block text-white/70 hover:text-accent transition-colors font-extralight"
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="block text-white/70 hover:text-accent transition-colors font-extralight"
              >
                Datenschutz
              </a>
              <a
                href="/agb"
                className="block text-white/70 hover:text-accent transition-colors font-extralight"
              >
                AGB
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm font-extralight">
          © 2025 bsp media GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}

