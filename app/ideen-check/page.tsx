'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/sections/Hero'
import { getSectionContent } from '@/lib/api'
import type { IdeenCheckPromiseData, IdeenCheckWhyData, IdeenCheckProductData } from '@/lib/types'

const PAGE_SLUG = 'ideen-check'

const defaultPromise: IdeenCheckPromiseData = {
  items: [
    {
      title: 'Kein Verkaufsgespräch',
      text: 'Wir rufen Sie nicht ungefragt an.',
    },
    {
      title: 'Keine Bindung',
      text: 'Das Feedback gehört Ihnen. Ob Sie mit uns, einer anderen Agentur oder inhouse produzieren, entscheiden allein Sie.',
    },
    {
      title: 'Echte Expertise',
      text: 'Kein Algorithmus, sondern Feedback von Senior Creatives.',
    },
  ],
}

const defaultWhy: IdeenCheckWhyData = {
  text: 'Warum wir das tun? Weil wir an gute Geschichten glauben. Wir sehen täglich Videos, die ihr Potenzial verschenken. Wir wollen, dass Ihr Projekt ein Erfolg wird – egal mit wem Sie es umsetzen. Und natürlich hoffen wir, dass Sie unsere Expertise so überzeugt, dass wir bei Ihrem nächsten großen Ding zumindest auf Ihrer Shortlist stehen.',
}

const defaultProduct: IdeenCheckProductData = {
  items: [
    {
      type: 'thumb',
      label: 'Der Daumenwert',
      example: '„Storytelling-Potenzial: 8/10“',
    },
    {
      type: 'win',
      label: 'Der Quick-Win',
      example: '„Ändern Sie den Einstieg von Szene A auf Szene B, um die Zuschauer sofort zu binden.“',
    },
    {
      type: 'warning',
      label: 'Die Warnlampe',
      example: '„Achtung: Die Umsetzung von Idee X erfordert spezielles Equipment/Licht, das den Zeitplan sprengen könnte.“',
    },
  ],
}

function IdeenCheckContent() {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const [promise, setPromise] = useState<IdeenCheckPromiseData | null>(null)
  const [why, setWhy] = useState<IdeenCheckWhyData | null>(null)
  const [product, setProduct] = useState<IdeenCheckProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [promiseData, whyData, productData] = await Promise.all([
        getSectionContent('ideen_check_promise', PAGE_SLUG),
        getSectionContent('ideen_check_why', PAGE_SLUG),
        getSectionContent('ideen_check_product', PAGE_SLUG),
      ])
      setPromise(promiseData && Object.keys(promiseData).length ? promiseData : defaultPromise)
      setWhy(whyData && (whyData as IdeenCheckWhyData).text != null ? whyData : defaultWhy)
      setProduct(productData && (productData as IdeenCheckProductData).items?.length ? productData : defaultProduct)
      setLoading(false)
    }
    load()
  }, [])

  const scrollToForm = () => {
    document.getElementById('ideen-check-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const promiseItems = promise?.items ?? defaultPromise.items!
  const whyText = why?.text ?? defaultWhy.text!
  const productItems = product?.items ?? defaultProduct.items!

  const content = (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero pageSlug={PAGE_SLUG} />

      {/* Fair-Play Versprechen */}
      <section id="fair-play" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promiseItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                  {index === 0 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum wir das machen */}
      <section id="warum" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8 tracking-tight">
            Warum wir das machen?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            {whyText}
          </p>
        </div>
      </section>

      {/* 24h-Formular */}
      <section id="ideen-check-form" className="py-24 bg-slate-900">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
              Das 24h-Formular
            </h2>
            <p className="text-gray-300 font-light">
              Um die 24 Stunden halten zu können, brauchen wir strukturierte Angaben von Ihnen.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Ihre Idee ist bei uns angekommen.</h3>
                <p className="text-slate-600">Wir melden uns innerhalb eines Werktages bei Ihnen.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const fd = new FormData(form)
                  setFormStatus('sending')
                  setFormError('')
                  try {
                    const res = await fetch('/api/ideen-check', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        title: fd.get('title'),
                        story: fd.get('story'),
                        concern: fd.get('concern'),
                        email: fd.get('email'),
                        attachmentName: fd.get('attachmentName') || undefined,
                      }),
                    })
                    const data = await res.json()
                    if (res.ok && data.success) {
                      setFormStatus('success')
                      form.reset()
                    } else {
                      setFormStatus('error')
                      const detail = data.resendMessage || data.details
                      setFormError(
                        data.error + (detail ? ` (${detail})` : '')
                      )
                    }
                  } catch {
                    setFormStatus('error')
                    setFormError('Netzwerkfehler. Bitte später erneut versuchen.')
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                    Arbeitstitel / Thema des Projekts
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="z.B. Recruiting-Video für IT-Abteilung"
                  />
                </div>
                <div>
                  <label htmlFor="story" className="block text-sm font-medium text-slate-700 mb-2">
                    Story-Skizze oder Konzept (Text)
                  </label>
                  <textarea
                    id="story"
                    name="story"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Kurze Beschreibung Ihrer Video-Idee, Ablauf, Zielgruppe..."
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Alternativ: PDF/Word per E-Mail an hallo@bsp-media.de mit Betreff „24h Ideen-Check“.
                  </p>
                </div>
                <div>
                  <label htmlFor="concern" className="block text-sm font-medium text-slate-700 mb-2">
                    Was ist Ihre größte Sorge?
                  </label>
                  <input
                    id="concern"
                    name="concern"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="z.B. Story zu langweilig? Budget zu klein? Technik unklar?"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    E-Mail-Adresse (für die Antwort)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="ihre@email.de"
                  />
                </div>
                <input type="hidden" name="attachmentName" value="" />
                {formError && (
                  <p className="text-sm text-red-600">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-accent text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-accent/90 disabled:opacity-50 transition-all"
                >
                  {formStatus === 'sending' ? 'Wird gesendet...' : 'Jetzt Idee einreichen – Antwort in 24h'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Das "Produkt" – Preview der Antwort */}
      <section id="produkt" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              Was Sie nach 24 Stunden erhalten
            </h2>
            <p className="text-slate-600 font-light max-w-2xl mx-auto">
              Kein Einzeiler – ein klares, fachliches Feedback mit Daumenwert, Quick-Win und Hinweisen.
            </p>
          </div>
          <div className="space-y-6">
            {productItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-start gap-4"
              >
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shrink-0 ${
                    item.type === 'thumb'
                      ? 'bg-amber-100 text-amber-800'
                      : item.type === 'win'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {item.label}
                </span>
                <p className="text-slate-700 leading-relaxed italic flex-1">"{item.example}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )

  if (isEditMode) {
    return (
      <EditModeProvider initialEditMode={true}>
        <EditModeBar />
        <div className="pt-16">
          {loading ? (
            <div className="min-h-screen flex items-center justify-center text-slate-500">Wird geladen...</div>
          ) : (
            content
          )}
        </div>
      </EditModeProvider>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-slate-500">Wird geladen...</span>
      </div>
    )
  }

  return content
}

export default function IdeenCheckPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white">Wird geladen...</div>}>
      <IdeenCheckContent />
    </Suspense>
  )
}
