import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-dark mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/cases"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-dark mb-2">Cases verwalten</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Cases erstellen, bearbeiten und löschen
          </p>
        </Link>

        <Link
          href="/admin/content"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-dark mb-2">Content bearbeiten</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Startseite, Header und Footer bearbeiten
          </p>
        </Link>

        <Link
          href="/admin/pages"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-dark mb-2">Seiten verwalten</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Alle Seiten verwalten und bearbeiten
          </p>
        </Link>

        <Link
          href="/admin/edit"
          className="bg-gradient-to-br from-accent to-pink-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-2">✏️ Visueller Editor</h2>
          <p className="text-white/90 font-extralight text-sm">
            Seiten direkt auf der Website bearbeiten (Squarespace-Style)
          </p>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-dark mb-2">Website ansehen</h2>
          <p className="text-gray-600 font-extralight text-sm">
            Öffnet die Website in einem neuen Tab
          </p>
        </Link>
      </div>
    </div>
  )
}


