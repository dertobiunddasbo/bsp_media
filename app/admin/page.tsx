import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-dark mb-4">CMS Dashboard</h1>
      <p className="text-gray-600 font-extralight mb-8">
        Verwaltung der Website-Inhalte
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Visueller Editor - Hauptfunktion */}
        <Link
          href="/?edit=true"
          target="_blank"
          className="bg-gradient-to-br from-accent to-pink-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 border border-accent/20"
        >
          <div className="text-4xl mb-4">✏️</div>
          <h2 className="text-2xl font-semibold mb-3">Visueller Editor</h2>
          <p className="text-white/90 font-extralight text-sm leading-relaxed">
            Bearbeite die Website direkt auf der Seite. Hovern über Bereiche zeigt den "Bearbeiten"-Button.
          </p>
          <div className="mt-4 text-xs text-white/80 font-light">
            Öffnet in neuem Tab →
          </div>
        </Link>

        {/* Cases verwalten */}
        <Link
          href="/admin/cases"
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="text-4xl mb-4">🎬</div>
          <h2 className="text-xl font-semibold text-dark mb-2">Cases verwalten</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Portfolio-Cases erstellen, bearbeiten und löschen
          </p>
        </Link>

        {/* Website ansehen */}
        <Link
          href="/"
          target="_blank"
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="text-4xl mb-4">🌐</div>
          <h2 className="text-xl font-semibold text-dark mb-2">Website ansehen</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Öffnet die Website in einem neuen Tab
          </p>
        </Link>
      </div>

      {/* Info Box */}
      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl max-w-4xl">
        <h3 className="text-lg font-semibold text-dark mb-2">💡 So funktioniert der Visuelle Editor:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 font-extralight text-sm">
          <li>Klicke auf "Visueller Editor" oben</li>
          <li>Die Website öffnet sich mit Bearbeitungsmodus</li>
          <li>Hovern über Bereiche zeigt den "Bearbeiten"-Button</li>
          <li>Klicke auf "Bearbeiten" um Inhalte zu ändern</li>
          <li>Speichere deine Änderungen</li>
        </ol>
      </div>
    </div>
  )
}


