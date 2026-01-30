'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStoredConsent, setConsent } from '@/lib/analytics'

/**
 * Cookie-Einwilligungsbanner (DSGVO/TDDDG-konform).
 * - Opt-in: Kein Marketing-/Analytics-Tracking vor Klick auf "Alle akzeptieren".
 * - Einfache Ablehnung: "Nur notwendige" gleichwertig angeboten.
 * - Verweis auf Datenschutzerklärung.
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const consent = getStoredConsent()
    setShowBanner(consent === null)
  }, [mounted])

  const handleAccept = () => {
    setConsent('granted')
    setShowBanner(false)
  }

  const handleReject = () => {
    setConsent('denied')
    setShowBanner(false)
  }

  if (!mounted || !showBanner) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-dark/10 bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-dark/80 font-light leading-relaxed">
            Wir nutzen auf dieser Website Cookies und ähnliche Technologien. Einige sind für den
            Betrieb notwendig, andere helfen uns, die Nutzung zu analysieren (z. B. Google
            Analytics). Sie können nur die notwendigen Cookies akzeptieren oder alle Cookies
            zulassen. Weitere Informationen finden Sie in unserer{' '}
            <Link
              href="/datenschutz"
              className="text-accent hover:underline underline-offset-2"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReject}
              className="rounded border border-dark/20 bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-dark/5 transition-colors"
            >
              Nur notwendige
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="rounded bg-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
