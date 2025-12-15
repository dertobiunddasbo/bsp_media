'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="transition-all duration-300 group"
            >
              <img
                src="/logo.png"
                alt="BSP MEDIA"
                className="h-12 md:h-16 w-auto group-hover:opacity-90 transition-opacity"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('leistungen')}
              className="text-dark hover:text-accent transition-all duration-300 font-light px-4 py-2 rounded-lg hover:bg-gray-50 relative group"
            >
              Leistungen
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </button>
            <Link
              href="/portfolio"
              className="text-dark hover:text-accent transition-all duration-300 font-light px-4 py-2 rounded-lg hover:bg-gray-50 relative group"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-dark hover:text-accent transition-all duration-300 font-light px-4 py-2 rounded-lg hover:bg-gray-50 relative group"
            >
              Über uns
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </button>
            <Link
              href="/kontakt"
              className="text-dark hover:text-accent transition-all duration-300 font-light px-4 py-2 rounded-lg hover:bg-gray-50 relative group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/kontakt"
              className="ml-4 bg-accent text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Anfrage senden
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-dark"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-100">
            <button
              onClick={() => scrollToSection('leistungen')}
              className="block w-full text-left text-dark hover:text-accent transition-colors font-light py-2"
            >
              Leistungen
            </button>
            <Link
              href="/portfolio"
              className="block w-full text-left text-dark hover:text-accent transition-colors font-light py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-dark hover:text-accent transition-colors font-light py-2"
            >
              Über uns
            </button>
            <Link
              href="/kontakt"
              className="block w-full text-left text-dark hover:text-accent transition-colors font-light py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Link
              href="/kontakt"
              className="w-full bg-accent text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              Anfrage senden
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
