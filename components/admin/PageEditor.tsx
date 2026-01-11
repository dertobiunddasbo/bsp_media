'use client'

import { useState, useEffect } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import HeroEditor from '@/components/admin/editors/HeroEditor'
import LeistungenEditor from '@/components/admin/editors/LeistungenEditor'
import AboutEditor from '@/components/admin/editors/AboutEditor'
import TrustSectionEditor from '@/components/admin/editors/TrustSectionEditor'
import ValuePropositionEditor from '@/components/admin/editors/ValuePropositionEditor'
import CollaborationPrinciplesEditor from '@/components/admin/editors/CollaborationPrinciplesEditor'
import NDADisclaimerEditor from '@/components/admin/editors/NDADisclaimerEditor'
import FooterEditor from '@/components/admin/editors/FooterEditor'
import { 
  getSectionContent, 
  saveSectionContent, 
  defaultHeroData, 
  defaultLeistungenData, 
  defaultAboutData,
  defaultTrustSectionData,
  defaultValuePropositionData,
  defaultCollaborationPrinciplesData,
  defaultNDADisclaimerData,
  defaultFooterData
} from '@/lib/api'

interface PageEditorProps {
  pageSlug?: string
}

type SectionKey = 'hero' | 'trust' | 'nda' | 'values' | 'principles' | 'leistungen' | 'about' | 'footer'

export default function PageEditor({ pageSlug = 'home' }: PageEditorProps) {
  const { setEditingSection } = useEditMode()
  const [activeSection, setActiveSection] = useState<SectionKey>('hero')
  const [heroData, setHeroData] = useState<any>(null)
  const [trustData, setTrustData] = useState<any>(null)
  const [ndaData, setNdaData] = useState<any>(null)
  const [valuesData, setValuesData] = useState<any>(null)
  const [principlesData, setPrinciplesData] = useState<any>(null)
  const [leistungenData, setLeistungenData] = useState<any>(null)
  const [aboutData, setAboutData] = useState<any>(null)
  const [footerData, setFooterData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [pageSlug])

  const loadAllData = async () => {
    try {
      // Load all sections using unified API
      const [hero, trust, nda, values, principles, leistungen, about, footer] = await Promise.all([
        getSectionContent('hero', pageSlug),
        getSectionContent('trust', pageSlug),
        getSectionContent('nda', pageSlug),
        getSectionContent('values', pageSlug),
        getSectionContent('principles', pageSlug),
        getSectionContent('leistungen', pageSlug),
        getSectionContent('about', pageSlug),
        getSectionContent('footer', pageSlug),
      ])

      setHeroData(hero || defaultHeroData)
      setTrustData(trust || defaultTrustSectionData)
      setNdaData(nda || defaultNDADisclaimerData)
      setValuesData(values || defaultValuePropositionData)
      setPrinciplesData(principles || defaultCollaborationPrinciplesData)
      setLeistungenData(leistungen || defaultLeistungenData)
      setAboutData(about || defaultAboutData)
      setFooterData(footer || defaultFooterData)
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
    if (section === 'trust') setTrustData(data)
    if (section === 'nda') setNdaData(data)
    if (section === 'values') setValuesData(data)
    if (section === 'principles') setPrinciplesData(data)
    if (section === 'leistungen') setLeistungenData(data)
    if (section === 'about') setAboutData(data)
    if (section === 'footer') setFooterData(data)
    
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
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          <button
            onClick={() => setActiveSection('hero')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'hero'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Hero
          </button>
          <button
            onClick={() => setActiveSection('trust')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'trust'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Trust
          </button>
          <button
            onClick={() => setActiveSection('nda')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'nda'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            NDA
          </button>
          <button
            onClick={() => setActiveSection('values')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'values'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Werte
          </button>
          <button
            onClick={() => setActiveSection('principles')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'principles'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Prinzipien
          </button>
          <button
            onClick={() => setActiveSection('leistungen')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'leistungen'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Leistungen
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'about'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Über uns
          </button>
          <button
            onClick={() => setActiveSection('footer')}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeSection === 'footer'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Footer
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
          {activeSection === 'trust' && trustData && (
            <TrustSectionEditor
              sectionKey="trust"
              pageSlug={pageSlug}
              initialData={trustData}
              onSave={(data) => handleSave('trust', data)}
            />
          )}
          {activeSection === 'nda' && ndaData && (
            <NDADisclaimerEditor
              sectionKey="nda"
              pageSlug={pageSlug}
              initialData={ndaData}
              onSave={(data) => handleSave('nda', data)}
            />
          )}
          {activeSection === 'values' && valuesData && (
            <ValuePropositionEditor
              sectionKey="values"
              pageSlug={pageSlug}
              initialData={valuesData}
              onSave={(data) => handleSave('values', data)}
            />
          )}
          {activeSection === 'principles' && principlesData && (
            <CollaborationPrinciplesEditor
              sectionKey="principles"
              pageSlug={pageSlug}
              initialData={principlesData}
              onSave={(data) => handleSave('principles', data)}
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
          {activeSection === 'footer' && footerData && (
            <FooterEditor
              sectionKey="footer"
              pageSlug={pageSlug}
              initialData={footerData}
              onSave={(data) => handleSave('footer', data)}
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

