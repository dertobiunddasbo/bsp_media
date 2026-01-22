'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    cases: 0,
    sections: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [casesRes, contentRes] = await Promise.all([
        fetch('/api/admin/cases'),
        fetch('/api/admin/content'),
      ])

      const cases = await casesRes.json()
      const content = await contentRes.json()

      setStats({
        cases: Array.isArray(cases) ? cases.length : 0,
        sections: Array.isArray(content) ? content.length : 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: 'Cases',
      count: stats.cases,
      icon: '🎬',
      href: '/admin/cases',
      color: 'bg-blue-500',
    },
    {
      title: 'Content-Sections',
      count: stats.sections,
      icon: '📝',
      href: '/admin/content',
      color: 'bg-purple-500',
    },
    {
      title: 'Landing Pages',
      count: 4,
      icon: '📄',
      href: '/admin/pages',
      color: 'bg-pink-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Übersicht über deine Website-Inhalte</p>
      </div>

      {loading ? (
        <div className="text-gray-600">Wird geladen...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-dark">{card.count}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-dark mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/cases/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <div>
              <div className="font-semibold text-gray-900">Neuer Case</div>
              <div className="text-sm text-gray-600">Erstelle ein neues Portfolio-Projekt</div>
            </div>
          </Link>
          <Link
            href="/?edit=true"
            target="_blank"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="text-2xl">✏️</span>
            <div>
              <div className="font-semibold text-gray-900">Seite bearbeiten</div>
              <div className="text-sm text-gray-600">Visueller Editor - direkt auf der Seite</div>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="text-2xl">🌐</span>
            <div>
              <div className="font-semibold text-gray-900">Website ansehen</div>
              <div className="text-sm text-gray-600">Öffnet die Website in neuem Tab</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
