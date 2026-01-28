'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Case {
  id: string
  title: string
  category: string
  description: string
  image: string
  client: string
  slug?: string
}

export default function CasesSection() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      // Add cache-busting parameter to ensure fresh data
      const cacheBuster = `?limit=3&t=${Date.now()}`
      const res = await fetch(`/api/cases${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      const data = await res.json()
      if (data && Array.isArray(data)) {
        setCases(data)
      } else {
        // Fallback to default data
        setCases([
          {
            id: 'aldi-sued-supplier-portraits',
            title: 'ALDI SÜD Supplier Portraits',
            category: 'Corporate',
            description: 'Einfühlsame Portraitfilme, die die Menschen hinter den Produkten sichtbar machen. Authentische Einblicke in Produktion, Werte und tägliche Abläufe.',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            client: 'ALDI SÜD',
          },
          {
            id: 'apoprojekt-employer-branding',
            title: 'apoprojekt & Du',
            category: 'Employer Branding',
            description: 'Authentische Mitarbeiterportraits an allen deutschen Standorten. Filme, die Menschen, Rollen und Arbeitskultur unmittelbar erlebbar machen.',
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            client: 'apoprojekt',
          },
          {
            id: 'zal-innovation-days',
            title: 'ZAL Innovation Days',
            category: 'Event/Kongressfilm',
            description: 'Dynamische Eventdokumentation eines zweitägigen Kongresses. Panels, Workshops, Ausstellungen und Networking-Momente aus nächster Nähe.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            client: 'ZAL',
          },
        ])
      }
    } catch (error) {
      console.error('Error loading cases:', error)
      // Fallback to empty array on error
      setCases([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-40 bg-slate-100 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-32">
          <div className="inline-block mb-8 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
            Unsere Projekte
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-12 tracking-tight leading-[1.05]">
            Case Studies
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-extralight leading-relaxed">
            Einblicke in unsere Filmproduktionen und visuellen Kommunikationslösungen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.id}
              href={`/portfolio/${caseItem.slug || caseItem.id}`}
              className="group relative bg-white overflow-hidden transition-all duration-500"
            >
              {/* Image Container - Großformatig */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Projektnummer als Overlay (wie Gronlander) */}
                <div className="absolute top-8 left-8 text-white/90 text-6xl md:text-7xl font-bold leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-8 right-8">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                    {caseItem.category}
                  </span>
                </div>

                {/* Content Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 group-hover:text-accent transition-colors leading-tight">
                    {caseItem.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed font-light text-base md:text-lg mb-6 line-clamp-2">
                    {caseItem.description ? caseItem.description.replace(/<[^>]*>/g, '').trim() : ''}
                  </p>
                  <div className="flex items-center text-white font-light text-sm md:text-base">
                    <span>Zum Projekt</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Link to full portfolio */}
        <div className="text-center mt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center px-10 py-5 bg-accent text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Alle Cases ansehen</span>
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

