/**
 * Testimonials Section Component
 * Displays customer testimonials with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { TestimonialData } from '@/lib/types'
import { getSectionContent, saveSectionContent, defaultTestimonialData } from '@/lib/api'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import TestimonialsEditor from '@/components/admin/editors/TestimonialsEditor'
import { decodeHtmlEntities } from '@/lib/html-utils'

interface TestimonialsProps {
  pageSlug?: string
}

export default function Testimonials({ pageSlug = 'home' }: TestimonialsProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [data, setData] = useState<TestimonialData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const content = await getSectionContent('testimonials', pageSlug)
    setData(content || defaultTestimonialData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    
    const handleSave = () => loadData()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [pageSlug])

  const handleSave = async (newData: TestimonialData) => {
    try {
      const result = await saveSectionContent('testimonials', newData, pageSlug)
      if (result.success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await loadData()
        window.dispatchEvent(new CustomEvent('editMode:sectionSaved'))
      } else {
        alert(`Fehler beim Speichern: ${result.error || 'Unbekannter Fehler'}`)
        console.error('Save failed for testimonials section:', result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      console.error('Error saving testimonials:', errorMessage)
      alert(`Fehler beim Speichern: ${errorMessage}`)
    }
  }

  if (loading || !data) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  const testimonials = data.testimonials || []

  return (
    <>
      <EditableSection sectionKey="testimonials">
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-32">
              {data.title && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-12 tracking-tight leading-[1.05]">
                  {data.title}
                </h2>
              )}
              {data.subtitle && (
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-accent/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Rating Stars */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating!
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Quote */}
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 text-accent/20 mb-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                    </svg>
                    <p 
                      className="text-slate-700 leading-relaxed font-light text-lg italic"
                      dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(`"${testimonial.quote}"`) }}
                    />
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600 font-light">
                        {testimonial.position}
                      </p>
                      <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'testimonials' && (
        <EditModal title="Testimonials Section bearbeiten">
          <TestimonialsEditor
            sectionKey="testimonials"
            pageSlug={pageSlug}
            initialData={data}
            onSave={handleSave}
          />
        </EditModal>
      )}
    </>
  )
}
