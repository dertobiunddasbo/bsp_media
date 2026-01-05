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
}

export default function CasesSection() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      const res = await fetch('/api/cases?limit=3')
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
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
            Unsere Projekte
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
            Ausgewählte Cases
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-extralight leading-relaxed">
            Einblicke in unsere Filmproduktionen und visuellen Kommunikationslösungen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/portfolio/${caseItem.id}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {caseItem.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-extralight mb-4 text-sm">
                  {caseItem.description}
                </p>
                <div className="flex items-center text-accent font-light text-sm">
                  <span>Mehr erfahren</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
            </Link>
          ))}
        </div>

        {/* Link to full portfolio */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>Alle Cases ansehen</span>
            <svg
              className="w-5 h-5 ml-2"
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

