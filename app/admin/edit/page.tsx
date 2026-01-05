'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const pages = [
  { slug: 'home', title: 'Startseite', description: 'Hauptseite der Website' },
  { slug: 'kmu', title: 'KMU', description: 'Seite für kleine und mittlere Unternehmen' },
  { slug: 'startups', title: 'Startups', description: 'Seite für Startups' },
  { slug: 'non-profit', title: 'Non-Profit', description: 'Seite für Non-Profit Organisationen' },
  { slug: 'oeffentlicher-sektor', title: 'Öffentlicher Sektor', description: 'Seite für öffentlichen Sektor' },
  { slug: 'agentur-partner', title: 'Agentur & Partner', description: 'Seite für Agenturen und Partner' },
  { slug: 'kontakt', title: 'Kontakt', description: 'Kontaktseite' },
  { slug: 'portfolio', title: 'Portfolio', description: 'Portfolio-Übersichtsseite' },
]

export default function EditPage() {
  const router = useRouter()

  const handleEditPage = (slug: string) => {
    if (slug === 'home') {
      router.push('/?edit=true')
    } else {
      router.push(`/${slug}?edit=true`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Zurück zum Admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visueller Editor
          </h1>
          <p className="text-lg text-gray-600">
            Wählen Sie eine Seite aus, die Sie bearbeiten möchten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <button
              key={page.slug}
              onClick={() => handleEditPage(page.slug)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-lg hover:border-accent transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors">
                  {page.title}
                </h3>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors"
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
              <p className="text-sm text-gray-600 mb-4">{page.description}</p>
              <div className="inline-flex items-center text-sm font-semibold text-accent">
                Bearbeiten
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 So funktioniert's:
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>1. Wählen Sie eine Seite aus</li>
            <li>2. Die Seite öffnet sich im Bearbeitungsmodus</li>
            <li>3. Fahren Sie mit der Maus über Sections, um sie zu bearbeiten</li>
            <li>4. Klicken Sie auf "Bearbeiten", um Inhalte zu ändern</li>
            <li>5. Speichern Sie Ihre Änderungen</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
