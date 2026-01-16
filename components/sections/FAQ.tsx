/**
 * FAQ Section Component
 * Displays frequently asked questions with accordion functionality
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { FAQData } from '@/lib/types'
import { getSectionContent, defaultFAQData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'

interface FAQProps {
  pageSlug?: string
}

export default function FAQ({ pageSlug = 'home' }: FAQProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('faq', pageSlug)
    setData(content || defaultFAQData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loading || !data) {
    return (
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const items = data.items || []

  return (
    <>
      <EditableSection sectionKey="faq">
        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              {data.title && (
                <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
                  {data.title}
                </h2>
              )}
              {data.subtitle && (
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-lg pr-8">
                      {item.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-5 border-t border-gray-100">
                      <p className="text-slate-700 leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-6 font-light">
                Haben Sie weitere Fragen?
              </p>
              <a
                href="/kontakt"
                className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </section>
      </EditableSection>
    </>
  )
}
