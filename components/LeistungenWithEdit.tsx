'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import EditableSection from './EditableSection'
import EditModal from './EditModal'
import LeistungenEditor from './editors/LeistungenEditor'

interface Service {
  title: string
  description: string
  image: string
  gradient?: string
}

interface LeistungenData {
  title?: string
  subtitle?: string
  items?: Service[]
}

export default function LeistungenWithEdit({ pageSlug = 'home' }: { pageSlug?: string }) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<LeistungenData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
    
    const handleSave = () => {
      loadData()
    }
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [])

  const loadData = async () => {
    try {
      const apiPath = pageSlug === 'home' ? '/api/content/leistungen' : `/api/pages/${pageSlug}/sections?section_key=leistungen`
      const res = await fetch(apiPath)
      const content = await res.json()
      if (content) {
        setData(content)
      } else {
        setData({
          title: 'Unsere Leistungen',
          subtitle: 'Professionelle audiovisuelle Lösungen für Ihr Unternehmen',
          items: [
            {
              title: 'Industrial Documentary',
              description: 'Authentische Einblicke in Werk, Logistik und Change-Prozesse. Wir begleiten Transformation da, wo sie passiert – ohne den Betrieb zu stören.',
              image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Knowledge & Academy',
              description: 'Onboarding und Schulung im Netflix-Standard. Wir übersetzen trockenes Expertenwissen in Video-Masterclasses, die wirklich zu Ende geschaut werden.',
              image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Motion & Explanation',
              description: 'Komplexe Prozesse, Compliance oder IT-Security einfach erklärt. Wir verwandeln trockene Konzern-Vorgaben in verständliche Motion Graphics. Skalierbar, CI-konform und ideal für E-Learnings oder weltweite Rollouts.',
              image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Corporate Newsroom',
              description: 'Der wöchentliche CEO-Cast oder das Schicht-Update. Wir produzieren TV-Formate mit 24h-Turnaround. Damit Ihre Belegschaft informiert ist, bevor der Flurfunk startet.',
              image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Recruiting',
              description: 'Wir sorgen für mehr Bewerbungen. Authentische Einblicke in Ihre Unternehmenskultur, die die richtigen Kandidaten ansprechen. Ehrlich, direkt und ohne Marketing-Fassade.',
              image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
        })
      }
    } catch (error) {
      console.error('Error loading leistungen data:', error)
      setData({
        title: 'Unsere Leistungen',
        subtitle: 'Professionelle audiovisuelle Lösungen für Ihr Unternehmen',
        items: [],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (newData: LeistungenData) => {
    const apiPath = pageSlug === 'home' 
      ? '/api/admin/content'
      : `/api/admin/pages/${pageSlug}/sections`
    
    const body = pageSlug === 'home'
      ? { page_section: 'leistungen', content: newData }
      : { section_key: 'leistungen', content: newData }

    const res = await fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) throw new Error('Save failed')
    setData(newData)
  }

  if (loading || !data) {
    return (
      <section id="leistungen" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const services = data.items || []

  return (
    <>
      <EditableSection sectionKey="leistungen" className="">
        <section id="leistungen" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-6 px-5 py-2 bg-gray-100 rounded-full text-sm font-light text-slate-700">
                Was wir bieten
              </div>
              <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
                {data.title || 'Unsere Leistungen'}
              </h2>
              {data.subtitle && (
                <p className="text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'leistungen' && (
        <EditModal title="Leistungen Section bearbeiten">
          <LeistungenEditor
            sectionKey="leistungen"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}

