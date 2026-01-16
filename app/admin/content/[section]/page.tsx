'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import editors to avoid SSR issues
const HeroEditor = dynamic(() => import('@/components/admin/editors/HeroEditor'), { ssr: false })
const LeistungenEditor = dynamic(() => import('@/components/admin/editors/LeistungenEditor'), { ssr: false })
const AboutEditor = dynamic(() => import('@/components/admin/editors/AboutEditor'), { ssr: false })
const TrustSectionEditor = dynamic(() => import('@/components/admin/editors/TrustSectionEditor'), { ssr: false })
const ValuePropositionEditor = dynamic(() => import('@/components/admin/editors/ValuePropositionEditor'), { ssr: false })
const CollaborationPrinciplesEditor = dynamic(() => import('@/components/admin/editors/CollaborationPrinciplesEditor'), { ssr: false })
const NDADisclaimerEditor = dynamic(() => import('@/components/admin/editors/NDADisclaimerEditor'), { ssr: false })
const FooterEditor = dynamic(() => import('@/components/admin/editors/FooterEditor'), { ssr: false })
const WhyUsEditor = dynamic(() => import('@/components/admin/editors/WhyUsEditor'), { ssr: false })

const sectionNames: Record<string, string> = {
  hero: 'Hero Section',
  leistungen: 'Leistungen',
  about: 'Über uns',
  trust: 'Trust Section',
  values: 'Werte',
  principles: 'Zusammenarbeit',
  nda: 'NDA Disclaimer',
  footer: 'Footer',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  whyus: 'Warum wir',
}

const editorComponents: Record<string, any> = {
  hero: HeroEditor,
  leistungen: LeistungenEditor,
  about: AboutEditor,
  trust: TrustSectionEditor,
  values: ValuePropositionEditor,
  principles: CollaborationPrinciplesEditor,
  nda: NDADisclaimerEditor,
  footer: FooterEditor,
  whyus: WhyUsEditor,
}

export default function ContentEditPage() {
  const params = useParams()
  const router = useRouter()
  const section = Array.isArray(params.section) ? params.section[0] : (params.section as string)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (section) {
      fetchData()
    }
  }, [section])

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/content?section=${section}`)
      if (!res.ok) throw new Error('Failed to fetch content')
      const result = await res.json()
      setData(result?.content || null)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (newData: any) => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_section: section,
          content: newData,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Fehler beim Speichern')
      }

      alert('Gespeichert!')
      router.push('/admin/content')
    } catch (error: any) {
      console.error('Error saving content:', error)
      alert(`Fehler beim Speichern: ${error.message}`)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  const EditorComponent = editorComponents[section]

  if (!EditorComponent) {
    return (
      <div>
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
          <h1 className="text-4xl font-bold text-dark mb-2">
            {sectionNames[section] || section}
          </h1>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="text-yellow-800">
            Editor für diese Section ist noch nicht verfügbar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <h1 className="text-4xl font-bold text-dark mb-2">
          {sectionNames[section] || section} bearbeiten
        </h1>
        <p className="text-gray-600">Bearbeite die Inhalte dieser Section</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <EditorComponent
          sectionKey={section}
          pageSlug="home"
          initialData={data}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}
