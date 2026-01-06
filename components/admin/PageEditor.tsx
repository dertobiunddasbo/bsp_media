'use client'

import { useState, useEffect } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import HeroEditor from '@/components/admin/editors/HeroEditor'
import LeistungenEditor from '@/components/admin/editors/LeistungenEditor'
import AboutEditor from '@/components/admin/editors/AboutEditor'
import { getSectionContent, saveSectionContent, defaultHeroData, defaultLeistungenData, defaultAboutData } from '@/lib/api'

interface PageEditorProps {
  pageSlug?: string
}

export default function PageEditor({ pageSlug = 'home' }: PageEditorProps) {
  const { setEditingSection } = useEditMode()
  const [activeSection, setActiveSection] = useState<'hero' | 'leistungen' | 'about'>('hero')
  const [heroData, setHeroData] = useState<any>(null)
  const [leistungenData, setLeistungenData] = useState<any>(null)
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [pageSlug])

  const loadAllData = async () => {
    try {
      // Load all sections using unified API
      const [hero, leistungen, about] = await Promise.all([
        getSectionContent('hero', pageSlug),
        getSectionContent('leistungen', pageSlug),
        getSectionContent('about', pageSlug),
      ])

      setHeroData(hero || defaultHeroData)
      setLeistungenData(leistungen || defaultLeistungenData)
      setAboutData(about || defaultAboutData)
    } catch (error) {
      console.error('Error loading page data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (section: string, data: any) => {
    const success = await saveSectionContent(section, data, pageSlug)
    if (!success) throw new Error('Save failed')
    
    // Update local state
    if (section === 'hero') setHeroData(data)
    if (section === 'leistungen') setLeistungenData(data)
    if (section === 'about') setAboutData(data)
    
    // Trigger reload
    window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
        <div className="bg-white rounded-xl p-8">
          <div className="text-gray-600">Lade Daten...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-dark">Ganze Seite bearbeiten</h2>
          <button
            onClick={() => {
              setEditingSection(null)
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveSection('hero')}
            className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
              activeSection === 'hero'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Hero
          </button>
          <button
            onClick={() => setActiveSection('leistungen')}
            className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
              activeSection === 'leistungen'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Leistungen
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
              activeSection === 'about'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Über uns
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'hero' && heroData && (
            <HeroEditor
              sectionKey="hero"
              pageSlug={pageSlug}
              initialData={heroData}
              onSave={(data) => handleSave('hero', data)}
            />
          )}
          {activeSection === 'leistungen' && leistungenData && (
            <LeistungenEditor
              sectionKey="leistungen"
              pageSlug={pageSlug}
              initialData={leistungenData}
              onSave={(data) => handleSave('leistungen', data)}
            />
          )}
          {activeSection === 'about' && aboutData && (
            <AboutEditor
              sectionKey="about"
              pageSlug={pageSlug}
              initialData={aboutData}
              onSave={(data) => handleSave('about', data)}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Änderungen werden automatisch gespeichert, wenn du auf "Speichern" klickst
          </div>
          <button
            onClick={() => {
              setEditingSection(null)
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}

